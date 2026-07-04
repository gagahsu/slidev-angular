import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { HttpClientService } from '../http-client.service';

/*
  === 第27章練習解答：串接中央氣象署開放資料 API ===

  題目：使用 HttpClientService 的 getApi 呼叫 F-D0047-065
  （高雄市鄉鎮天氣預報），並以有設計感的版面呈現資料。

  CWA 回傳結構（新版 CamelCase 格式）：
  records
  └── Locations[0]              → 縣市層（LocationsName = 高雄市）
      └── Location[]            → 各行政區
          └── WeatherElement[]  → 天氣因子（溫度、降雨機率、天氣現象…）
              └── Time[]        → 各時段的預報值
                  └── ElementValue[0] → 實際數值（key 依因子而異）
*/

/** 整理後的單一時段預報（給畫面用的乾淨資料） */
interface ForecastSlot {
  startTime: Date;
  dayLabel: string;      // 今天 / 明天 / 週X
  timeLabel: string;     // 06:00 – 18:00
  weather: string;       // 天氣現象文字
  emoji: string;         // 對應的天氣圖示
  temp: string;          // 溫度 °C
  feelsLike: string;     // 體感溫度 °C
  humidity: string;      // 相對濕度 %
  pop: number | null;    // 降雨機率 %（API 可能回 '-'，故允許 null）
  windSpeed: string;     // 風速 m/s
  windDir: string;       // 風向
}

/** 一個行政區的完整預報 */
interface DistrictForecast {
  name: string;
  slots: ForecastSlot[];
}

@Component({
  selector: 'app-weather-practice',
  templateUrl: './weather-practice.component.html',
  styleUrl: './weather-practice.component.css',
  standalone: true,
  imports: []
})
export class WeatherPracticeComponent implements OnInit {

  private httpService = inject(HttpClientService);

  /** 中央氣象署開放資料平臺 API（高雄市鄉鎮天氣預報） */
  private readonly apiUrl =
    'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-D0047-065' +
    '?Authorization=CWA-0541EB45-8FB7-428F-835D-8412BE0A71CA&limit=10&format=JSON';

  /*
    這個專案採用 zoneless 變更偵測（app.config.ts 沒有 zone.js），
    在 subscribe 回呼中修改一般屬性「不會」更新畫面，
    所以狀態一律使用 Signals —— 呼叫 .set() 時 Angular 會自動重繪。
  */
  cityName = signal('');
  datasetDescription = signal('');
  districts = signal<DistrictForecast[]>([]);
  selectedIndex = signal(0);

  isLoading = signal(false);
  errorMessage = signal('');

  /** 目前選到的行政區（computed 會隨相依的 signal 自動更新） */
  selectedDistrict = computed<DistrictForecast | undefined>(
    () => this.districts()[this.selectedIndex()]
  );

  /** 主視覺卡片顯示「最近一個時段」的預報 */
  heroSlot = computed<ForecastSlot | undefined>(
    () => this.selectedDistrict()?.slots[0]
  );

  ngOnInit(): void {
    this.fetchWeather();
  }

  // ==============================
  // 練習要求 1、2：getApi + subscribe
  // ==============================
  fetchWeather(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.httpService.getApi(this.apiUrl).subscribe({
      next: (res: any) => {
        this.parseResponse(res);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('API 呼叫失敗：' + (err.message ?? '請稍後再試'));
        this.isLoading.set(false);
      }
    });
  }

  selectDistrict(index: number): void {
    this.selectedIndex.set(index);
  }

  // ==============================
  // 把 CWA 的巢狀 JSON 整理成畫面好用的陣列
  // ==============================
  private parseResponse(res: any): void {
    const records = res?.records ?? {};
    // 同時相容新版（Locations）與舊版（locations）鍵名
    const group = (records.Locations ?? records.locations ?? [])[0] ?? {};

    this.cityName.set(group.LocationsName ?? group.locationsName ?? '');
    this.datasetDescription.set(group.DatasetDescription ?? group.datasetDescription ?? '');

    const rawLocations: any[] = group.Location ?? group.location ?? [];
    this.districts.set(rawLocations.map((loc) => this.parseDistrict(loc)));
    this.selectedIndex.set(0);

    if (this.districts().length === 0) {
      this.errorMessage.set('API 有回應，但找不到預報資料，請檢查授權碼是否有效。');
    }
  }

  private parseDistrict(loc: any): DistrictForecast {
    const elements: any[] = loc.WeatherElement ?? loc.weatherElement ?? [];

    // 依名稱找天氣因子；2 天版與 1 週版的名稱略有不同，都列進候選
    const weatherEl = this.findElement(elements, ['天氣現象']);
    const tempEl = this.findElement(elements, ['溫度', '平均溫度']);
    const feelsEl = this.findElement(elements, ['體感溫度', '最高體感溫度']);
    const humidityEl = this.findElement(elements, ['相對濕度', '平均相對濕度']);
    const popEl = this.findElement(elements, ['3小時降雨機率', '12小時降雨機率', '降雨機率']);
    const windEl = this.findElement(elements, ['風速']);
    const windDirEl = this.findElement(elements, ['風向']);

    // 用「天氣現象」的時段當作主軸，其他因子再對齊到同一時段
    const baseTimes: any[] = this.timesOf(weatherEl ?? tempEl);

    const slots: ForecastSlot[] = baseTimes.slice(0, 12).map((t, i) => {
      const start = new Date(this.entryStart(t));
      const weather = this.firstValue(t);
      const popText = this.valueAt(popEl, t, i);
      const pop = /^\d+$/.test(popText) ? Number(popText) : null;

      return {
        startTime: start,
        dayLabel: this.dayLabel(start),
        timeLabel: this.timeLabel(t),
        weather,
        emoji: this.weatherEmoji(weather),
        temp: this.valueAt(tempEl, t, i),
        feelsLike: this.valueAt(feelsEl, t, i),
        humidity: this.valueAt(humidityEl, t, i),
        pop,
        windSpeed: this.valueAt(windEl, t, i),
        windDir: this.valueAt(windDirEl, t, i)
      };
    });

    return {
      name: loc.LocationName ?? loc.locationName ?? '',
      slots
    };
  }

  // ---------- 以下是解析用的小工具 ----------

  /** 依候選名稱找出天氣因子 */
  private findElement(elements: any[], names: string[]): any {
    return elements.find((e) => names.includes(e.ElementName ?? e.elementName));
  }

  private timesOf(element: any): any[] {
    return element?.Time ?? element?.time ?? [];
  }

  /** 時段起始時間（瞬時值用 DataTime、區間值用 StartTime） */
  private entryStart(t: any): number {
    const s = t?.DataTime ?? t?.StartTime ?? t?.dataTime ?? t?.startTime;
    return s ? new Date(s).getTime() : NaN;
  }

  private entryEnd(t: any): number {
    const s = t?.EndTime ?? t?.endTime;
    return s ? new Date(s).getTime() : NaN;
  }

  /** 取出 ElementValue[0] 內第一個非空值（key 依因子而異） */
  private firstValue(entry: any): string {
    const ev = entry?.ElementValue ?? entry?.elementValue;
    if (Array.isArray(ev) && ev.length > 0) {
      const v = Object.values(ev[0]).find((x) => x !== '' && x != null);
      return v != null ? String(v) : '';
    }
    return '';
  }

  /** 在某個因子中，找出對應到 baseEntry 時段的預報值 */
  private valueAt(element: any, baseEntry: any, index: number): string {
    const times = this.timesOf(element);
    if (times.length === 0) { return ''; }

    const target = this.entryStart(baseEntry);

    // ① 起始時間完全相同
    let entry = times.find((t: any) => this.entryStart(t) === target);
    // ② 目標時間落在該筆的區間內
    if (!entry) {
      entry = times.find((t: any) => {
        const s = this.entryStart(t);
        const e = this.entryEnd(t);
        return !isNaN(e) && target >= s && target < e;
      });
    }
    // ③ 退而求其次：用同一個索引
    if (!entry) {
      entry = times[Math.min(index, times.length - 1)];
    }
    return this.firstValue(entry);
  }

  /** 把日期換算成 今天 / 明天 / 後天 / 週X */
  private dayLabel(d: Date): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(d);
    target.setHours(0, 0, 0, 0);

    const diffDays = Math.round((target.getTime() - today.getTime()) / 86400000);
    if (diffDays === 0) { return '今天'; }
    if (diffDays === 1) { return '明天'; }
    if (diffDays === 2) { return '後天'; }
    return ['週日', '週一', '週二', '週三', '週四', '週五', '週六'][d.getDay()];
  }

  /** 時段文字：區間顯示 06:00 – 18:00，瞬時只顯示起始時間 */
  private timeLabel(t: any): string {
    const start = this.entryStart(t);
    const end = this.entryEnd(t);
    const fmt = (ms: number) => {
      const d = new Date(ms);
      return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    };
    if (isNaN(start)) { return ''; }
    return isNaN(end) ? fmt(start) : `${fmt(start)} – ${fmt(end)}`;
  }

  /** 天氣現象文字 → 圖示（注意判斷順序：雷 > 雨 > 霧 > 陰 > 雲 > 晴） */
  private weatherEmoji(text: string): string {
    if (!text) { return '🌡️'; }
    if (text.includes('雷')) { return '⛈️'; }
    if (text.includes('雪')) { return '🌨️'; }
    if (text.includes('雨')) { return '🌧️'; }
    if (text.includes('霧')) { return '🌫️'; }
    if (text.includes('陰')) { return '☁️'; }
    if (text.includes('晴') && text.includes('雲')) { return '⛅'; }
    if (text.includes('雲')) { return '☁️'; }
    if (text.includes('晴')) { return '☀️'; }
    return '🌤️';
  }
}
