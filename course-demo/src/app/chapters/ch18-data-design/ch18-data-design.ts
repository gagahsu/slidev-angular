// 從 Angular 核心套件匯入 Component，用來宣告「這個 class 是一個元件」
import { Component } from '@angular/core';

@Component({
  selector: 'app-ch18-data-design',         // 這個元件在 HTML 中使用的標籤名稱
  imports: [],                              // 這一章不需要額外的模組
  templateUrl: './ch18-data-design.html',   // 這個元件使用的 HTML 檔案
  styleUrl: './ch18-data-design.css',       // 這個元件使用的 CSS 檔案
})
export class Ch18DataDesign {

  // 口訣：看到「多個」用 Array；包含許多欄位用 JSON（Object）
  questions = [
    { id: 1, title: '您對服務的評價？', options: ['非常滿意', '滿意', '不滿意'] },
    { id: 2, title: '您會推薦給朋友嗎？', options: ['會', '不會'] }
  ];

  // 進階：分類選單，多個分類用 Array
  menuCategories = [
    { key: 'accessories', name: '辦公配件' },
    { key: 'printer', name: '印表機' }
  ];

  // 進階：用分類的 key 當屬性名稱，值是該分類的商品陣列
  productDataMap: any = {
    accessories: [
      { id: 'acc-01', title: 'AI 智能會議筆記本', price: 16840 },
      { id: 'acc-02', title: 'USB-C 7 合 1 集線器', price: 1130 }
    ],
    printer: [
      { id: 'prt-01', title: '噴墨多功能複合式印表機', price: 4990 }
    ]
  };

  // 進階：記錄目前選到哪個分類
  currentCategory = 'accessories';

  // 練習：廣告區是一張圖加一個標題，用 Object
  // 示範專案沒有放投影片的商品照片，這裡先用同一張示意圖代替
  ad = {
    imageUrl: 'images/product.svg',
    title: '辦公周邊'
  };

  // 練習：分類有多個，用 Array
  categoryMenu = ['辦公配件', '印表機', '鍵盤滑鼠', '喇叭耳麥'];

  // 練習：商品有多筆，每筆又有多個欄位，用 Array of Object
  products = [
    { name: 'iFLYTEK AINOTE Air 2 AI智能會議筆記', price: 16840, imageUrl: 'images/product.svg' },
    { name: 'BELKIN USB-C 7合1高速多媒體集線器', price: 1130, imageUrl: 'images/product.svg' },
    { name: 'TDGB 17-49吋 高承重 20KG 無重力 電', price: 2391, imageUrl: 'images/product.svg' },
    { name: 'Raymii瑞米 LS-98-M1 氣壓式 螢幕支架', price: 999, imageUrl: 'images/product.svg' },
    { name: 'BELKIN Thunderbolt 4 5合1 dock 擴', price: 5752, imageUrl: 'images/product.svg' },
  ];

  // 補充練習 1：大分類對應子商品
  supplementsMap = {
    hairball: [
      { id: 'h-01', name: '鮭魚化毛膏', price: 320 },
      { id: 'h-02', name: '麥芽化毛膏', price: 280 }
    ],
    joint: [
      { id: 'j-01', name: '葡萄糖胺粉', price: 650 },
      { id: 'j-02', name: '綠唇貽貝錠', price: 890 }
    ]
  };

  // 補充練習 2：記錄目前的分類
  currentType: string = 'A';

  // 補充練習 2：點擊時帶入新的分類
  changeType(type: string) {
    this.currentType = type;
  }
}
