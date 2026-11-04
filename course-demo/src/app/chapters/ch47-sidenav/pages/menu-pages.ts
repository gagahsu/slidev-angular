import { Component } from '@angular/core';

// 這幾個頁面內容很短，所以直接用 template 寫在這裡，不另外開 HTML 檔案

@Component({ selector: 'app-menu-home', template: '<h3>Home 首頁</h3>' })
export class MenuHomeComponent {}

@Component({ selector: 'app-menu-dashboard', template: '<h3>Dashboard</h3>' })
export class MenuDashboardComponent {}

@Component({ selector: 'app-menu-cart', template: '<h3>Cart 購物車</h3>' })
export class MenuCartComponent {}
