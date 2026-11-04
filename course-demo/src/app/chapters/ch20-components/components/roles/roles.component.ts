import { Component } from '@angular/core';

@Component({
  selector: 'captain-hairball',              // 原本是 'app-roles'，改了之後父層標籤也要跟著改
  templateUrl: './roles.component.html',     // 這個元件使用的 HTML 檔案
})
export class RolesComponent {}
