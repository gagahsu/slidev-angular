import { Component } from '@angular/core';

// 這幾個頁面內容很短，所以直接用 template 寫在這裡，不另外開 HTML 檔案

@Component({ selector: 'app-test1', template: '<p>這是 TEST 的內容</p>' })
export class Test1Component {}

@Component({ selector: 'app-test2', template: '<p>這是 TEST2 的內容</p>' })
export class Test2Component {}

@Component({ selector: 'app-test3', template: '<p>這是 TEST3 的內容</p>' })
export class Test3Component {}

@Component({ selector: 'app-profile', template: '<p>這是個人帳戶設定的內容</p>' })
export class ProfileComponent {}

@Component({ selector: 'app-admin', template: '<p>這是後台管理的內容</p>' })
export class AdminComponent {}
