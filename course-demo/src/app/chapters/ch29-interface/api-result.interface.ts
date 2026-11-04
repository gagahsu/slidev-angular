// 把 interface 放在獨立的檔案，方便管理與重複使用
export interface Person {
  name: string;
  age?: number;   // 問號代表選填
  sex: string;
}
