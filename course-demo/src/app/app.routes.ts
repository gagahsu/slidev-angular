import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'ch14', pathMatch: 'full' },
  {
    path: 'ch14',
    loadComponent: () =>
      import('./chapters/ch14-variables/ch14-variables').then(m => m.Ch14Variables)
  },
  {
    path: 'ch15',
    loadComponent: () =>
      import('./chapters/ch15-methods/ch15-methods').then(m => m.Ch15Methods)
  },
  {
    path: 'ch17',
    loadComponent: () =>
      import('./chapters/ch17-typescript-practice/ch17-typescript-practice').then(m => m.Ch17TypescriptPractice)
  },
  {
    path: 'ch18',
    loadComponent: () =>
      import('./chapters/ch18-data-design/ch18-data-design').then(m => m.Ch18DataDesign)
  },
  {
    path: 'ch19',
    loadComponent: () =>
      import('./chapters/ch19-lifecycle/ch19-lifecycle').then(m => m.Ch19Lifecycle)
  },
  {
    path: 'ch20',
    loadComponent: () =>
      import('./chapters/ch20-components/ch20-components').then(m => m.Ch20Components)
  },
  {
    path: 'ch21',
    loadComponent: () =>
      import('./chapters/ch21-binding/ch21-binding').then(m => m.Ch21Binding)
  },
  {
    path: 'ch22',
    loadChildren: () =>
      import('./chapters/ch22-routing/ch22-routing.routes').then(m => m.routes)
  },
  {
    path: 'ch23',
    loadChildren: () =>
      import('./chapters/ch23-data-passing/ch23-data-passing.routes').then(m => m.routes)
  },
  {
    path: 'ch24',
    loadComponent: () =>
      import('./chapters/ch24-web-storage/ch24-web-storage').then(m => m.Ch24WebStorage)
  },
  {
    path: 'ch25',
    loadComponent: () =>
      import('./chapters/ch25-array-display/ch25-array-display').then(m => m.Ch25ArrayDisplay)
  },
  {
    path: 'ch26',
    loadComponent: () =>
      import('./chapters/ch26-if-condition/ch26-if-condition').then(m => m.Ch26IfCondition)
  },
  {
    path: 'ch27',
    loadComponent: () =>
      import('./chapters/ch27-switch/ch27-switch').then(m => m.Ch27Switch)
  },
  {
    path: 'ch28',
    loadComponent: () =>
      import('./chapters/ch28-http-api/ch28-http-api').then(m => m.Ch28HttpApi)
  },
  {
    path: 'ch28-openai',
    loadComponent: () =>
      import('./chapters/ch28-openai/ch28-openai').then(m => m.Ch28Openai)
  },
  {
    path: 'ch29',
    loadComponent: () =>
      import('./chapters/ch29-interface/ch29-interface').then(m => m.Ch29Interface)
  },
  {
    path: 'ch30',
    loadComponent: () =>
      import('./chapters/ch30-sorting/ch30-sorting').then(m => m.Ch30Sorting)
  },
  {
    path: 'ch32',
    loadComponent: () =>
      import('./chapters/ch32-mat-table/ch32-mat-table').then(m => m.Ch32MatTable)
  },
  {
    path: 'ch33',
    loadComponent: () =>
      import('./chapters/ch33-mat-icon/ch33-mat-icon').then(m => m.Ch33MatIcon)
  },
  {
    path: 'ch34',
    loadComponent: () =>
      import('./chapters/ch34-datepicker/ch34-datepicker').then(m => m.Ch34Datepicker)
  },
  {
    path: 'ch35',
    loadComponent: () =>
      import('./chapters/ch35-datepipe/ch35-datepipe').then(m => m.Ch35Datepipe)
  },
  {
    path: 'ch36',
    loadComponent: () =>
      import('./chapters/ch36-jsonpipe/ch36-jsonpipe').then(m => m.Ch36Jsonpipe)
  },
  {
    path: 'ch37',
    loadComponent: () =>
      import('./chapters/ch37-live-search/ch37-live-search').then(m => m.Ch37LiveSearch)
  },
  {
    path: 'ch38',
    loadComponent: () =>
      import('./chapters/ch38-ngclass/ch38-ngclass').then(m => m.Ch38Ngclass)
  },
  {
    path: 'ch39',
    loadChildren: () =>
      import('./chapters/ch39-tabs/ch39-tabs.routes').then(m => m.routes)
  },
  {
    path: 'ch40',
    loadComponent: () =>
      import('./chapters/ch40-select/ch40-select').then(m => m.Ch40Select)
  },
  {
    path: 'ch41',
    loadComponent: () =>
      import('./chapters/ch41-chart/ch41-chart').then(m => m.Ch41Chart)
  },
  {
    path: 'ch42',
    loadComponent: () =>
      import('./chapters/ch42-dialog/ch42-dialog').then(m => m.Ch42Dialog)
  },
  {
    path: 'ch43',
    loadComponent: () =>
      import('./chapters/ch43-async/ch43-async').then(m => m.Ch43Async)
  },
  {
    path: 'ch44',
    loadComponent: () =>
      import('./chapters/ch44-rxjs/ch44-rxjs').then(m => m.Ch44Rxjs)
  },
  {
    path: 'ch45',
    loadComponent: () =>
      import('./chapters/ch45-subscription/ch45-subscription').then(m => m.Ch45Subscription)
  },
  {
    path: 'ch46',
    loadChildren: () =>
      import('./chapters/ch46-loading/ch46-loading.routes').then(m => m.routes)
  },
  {
    path: 'ch47',
    loadComponent: () =>
      import('./chapters/ch47-signals/ch47-signals').then(m => m.Ch47Signals)
  },
  {
    path: 'ch48',
    loadChildren: () =>
      import('./chapters/ch48-sidenav/ch48-sidenav.routes').then(m => m.routes)
  },
  {
    path: 'ch49',
    loadChildren: () =>
      import('./chapters/ch49-toolbar/ch49-toolbar.routes').then(m => m.routes)
  },
  {
    path: 'ch50',
    loadComponent: () =>
      import('./chapters/ch50-radio-checkbox/ch50-radio-checkbox').then(m => m.Ch50RadioCheckbox)
  },
  {
    path: 'ch51',
    loadComponent: () =>
      import('./chapters/ch51-reactive-forms/ch51-reactive-forms').then(m => m.Ch51ReactiveForms)
  },
  {
    path: 'ch52',
    loadComponent: () =>
      import('./chapters/ch52-validators/ch52-validators').then(m => m.Ch52Validators)
  },
  {
    path: 'ch53',
    loadComponent: () =>
      import('./chapters/ch53-rwd/ch53-rwd').then(m => m.Ch53Rwd)
  }
];
