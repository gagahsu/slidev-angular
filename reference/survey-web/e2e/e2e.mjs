// 端對端驗收：後端 http://localhost:8080（reference/dynamic-survey）、前端 http://localhost:4200
// 執行：npm i -D playwright && node e2e/e2e.mjs   （資料庫要是剛匯入 seed 的狀態，Email 才不會重複）
import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://localhost:4200';
const stamp = Date.now();
let failed = 0;
const ok = (name, cond, extra = '') => { console.log((cond ? 'PASS ' : 'FAIL ') + name + (extra ? '  ' + extra : '')); if (!cond) failed++; };

const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});
const page = await (await browser.newContext({ locale: 'en-US' })).newPage();
page.on('pageerror', e => { console.log('PAGEERROR', e.message); failed++; });
const dialogText = async () => (await page.locator('mat-dialog-container').innerText().catch(() => '')).replace(/\s+/g, ' ');
const clickDialog = async name => { await page.locator('mat-dialog-container').getByRole('button', { name }).click(); await page.waitForTimeout(400); };
const login = async (email) => {
  await page.goto(`${BASE}/login`);
  await page.locator('input[formcontrolname=email]').fill(email);
  await page.locator('input[formcontrolname=password]').fill('Passw0rd12');
  await page.getByRole('button', { name: '登入' }).click();
  await page.waitForTimeout(1000);
};

// 1. 前台列表
await page.goto(`${BASE}/surveys`); await page.waitForTimeout(1200);
ok('前台列表有資料', (await page.locator('tr.mat-mdc-row').count()) >= 4);
ok('前台列表不含未發佈', !(await page.locator('body').innerText()).includes('未發佈'));

// 2. 前台守衛
await page.goto(`${BASE}/admin`); await page.waitForTimeout(500);
ok('未登入進後台 → 登入頁', page.url().includes('/login?redirect='));
await login('ming@example.com');
await page.goto(`${BASE}/admin`); await page.waitForTimeout(500);
ok('一般會員進後台 → 問卷列表', new URL(page.url()).pathname === '/surveys');
await page.evaluate(() => localStorage.clear());

// 3. 匿名作答：填寫 → 暫存 → 確認 → 送出
const email = `e2e${stamp}@example.com`;
await page.goto(`${BASE}/surveys/2/fill`); await page.waitForTimeout(1000);
await page.getByRole('button', { name: '送出' }).click(); await page.waitForTimeout(400);
ok('必填未填 → 提醒視窗', (await dialogText()).includes('請輸入姓名'));
await clickDialog('知道了');
await page.locator('input[formcontrolname=name]').fill('測試員');
await page.locator('input[formcontrolname=phone]').fill('0955123456');
await page.locator('input[formcontrolname=email]').fill(email);
await page.getByText('麵食', { exact: true }).click();
await page.getByText('青菜', { exact: true }).click(); await page.getByText('豆腐', { exact: true }).click();
await page.getByRole('button', { name: '送出' }).click(); await page.waitForTimeout(800);
ok('跳到確認頁', page.url().endsWith('/surveys/2/confirm'));
const confirmText = await page.locator('body').innerText();
ok('確認頁只顯示被選取的項目', confirmText.includes('麵食') && confirmText.includes('豆腐') && !confirmText.includes('便當'));
await page.getByRole('button', { name: '修改' }).click(); await page.waitForTimeout(300); await clickDialog('確定'); await page.waitForTimeout(800);
ok('修改 → 回填寫頁並帶回資料', (await page.locator('input[formcontrolname=name]').inputValue()) === '測試員');
await page.getByRole('button', { name: '送出', exact: true }).click(); await page.waitForTimeout(800);
await page.getByRole('button', { name: '確認送出' }).click(); await page.waitForTimeout(300); await clickDialog('確定'); await page.waitForTimeout(800);
ok('送出成功', (await dialogText()).includes('謝謝'));
await clickDialog('知道了');

// 4. 同一 Email 不可重複
await page.goto(`${BASE}/surveys/2/fill`); await page.waitForTimeout(800);
await page.locator('input[formcontrolname=name]').fill('測試員');
await page.locator('input[formcontrolname=phone]').fill('0955123456');
await page.locator('input[formcontrolname=email]').fill(email);
await page.getByText('麵食', { exact: true }).click();
await page.getByRole('button', { name: '送出' }).click(); await page.waitForTimeout(800);
ok('重複 Email → 提醒', (await dialogText()).includes('已經填寫'), await dialogText());
await clickDialog('知道了');

// 5. 統計
await page.goto(`${BASE}/surveys/2/stats`); await page.waitForTimeout(1500);
ok('統計頁有 2 張圓餅圖', (await page.locator('canvas').count()) === 2);

// 6. 後台：新增問卷（三步驟）+ 離開確認
await login('admin@example.com');
ok('管理員登入後進後台', new URL(page.url()).pathname === '/admin');
await page.goto(`${BASE}/admin`); await page.waitForTimeout(1000);
ok('後台列表含未發佈', (await page.locator('body').innerText()).includes('未發佈'));
await page.goto(`${BASE}/admin/edit`); await page.waitForTimeout(800);
await page.locator('input[formcontrolname=title]').fill(`E2E ${stamp}`);
await page.locator('textarea[formcontrolname=description]').fill('自動化測試');
await page.getByRole('link', { name: '問卷列表' }).click().catch(() => {}); await page.waitForTimeout(500);
ok('編輯到一半離開 → 確認視窗', (await dialogText()).includes('尚未儲存'));
await clickDialog('取消');
await page.getByRole('button', { name: '下一步' }).first().click(); await page.waitForTimeout(500);
await page.getByRole('button', { name: /新增題目/ }).click();
await page.locator('.q-form input[formcontrolname=title]').fill('你喜歡嗎');
await page.locator('textarea[formcontrolname=optionsText]').fill('喜歡\n不喜歡');
await page.getByRole('button', { name: '確定' }).click(); await page.waitForTimeout(300);
await page.getByRole('button', { name: '下一步' }).last().click(); await page.waitForTimeout(800);
await page.getByRole('button', { name: '儲存並發佈' }).click(); await page.waitForTimeout(800);
ok('儲存並發佈成功', (await dialogText()).includes('已儲存並發佈'));
await clickDialog('知道了'); await page.waitForTimeout(800);
ok('回到後台列表', new URL(page.url()).pathname === '/admin');

// 7. 後台：回饋與批次刪除
await page.goto(`${BASE}/admin/2/responses`); await page.waitForTimeout(1000);
ok('回饋列表有資料', (await page.locator('tr.mat-mdc-row').count()) >= 1);
await page.goto(`${BASE}/admin`); await page.waitForTimeout(1000);
const boxes = page.locator('tr.mat-mdc-row mat-checkbox input:not([disabled])');
ok('只有可刪除的列有勾選框', (await boxes.count()) >= 1);

await browser.close();
console.log(failed ? `\n${failed} 項失敗` : '\n全部通過');
process.exit(failed ? 1 : 0);
