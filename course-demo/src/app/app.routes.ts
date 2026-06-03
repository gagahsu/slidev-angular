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
      import('./chapters/ch17-data-design/ch17-data-design').then(m => m.Ch17DataDesign)
  },
  {
    path: 'ch18',
    loadComponent: () =>
      import('./chapters/ch18-lifecycle/ch18-lifecycle').then(m => m.Ch18Lifecycle)
  },
  {
    path: 'ch19',
    loadComponent: () =>
      import('./chapters/ch19-components/ch19-components').then(m => m.Ch19Components)
  },
  {
    path: 'ch20',
    loadComponent: () =>
      import('./chapters/ch20-binding/ch20-binding').then(m => m.Ch20Binding)
  },
  {
    path: 'ch21',
    loadComponent: () =>
      import('./chapters/ch21-routing/ch21-routing').then(m => m.Ch21Routing)
  },
  {
    path: 'ch22',
    loadComponent: () =>
      import('./chapters/ch22-data-passing/ch22-data-passing').then(m => m.Ch22DataPassing)
  },
  {
    path: 'ch23',
    loadComponent: () =>
      import('./chapters/ch23-web-storage/ch23-web-storage').then(m => m.Ch23WebStorage)
  },
  {
    path: 'ch24',
    loadComponent: () =>
      import('./chapters/ch24-array-display/ch24-array-display').then(m => m.Ch24ArrayDisplay)
  },
  {
    path: 'ch25',
    loadComponent: () =>
      import('./chapters/ch25-if-condition/ch25-if-condition').then(m => m.Ch25IfCondition)
  },
  {
    path: 'ch26',
    loadComponent: () =>
      import('./chapters/ch26-switch/ch26-switch').then(m => m.Ch26Switch)
  },
  {
    path: 'ch27',
    loadComponent: () =>
      import('./chapters/ch27-http-api/ch27-http-api').then(m => m.Ch27HttpApi)
  },
  {
    path: 'ch28',
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
    loadComponent: () =>
      import('./chapters/ch39-tabs/ch39-tabs').then(m => m.Ch39Tabs)
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
      import('./chapters/ch44-subscription/ch44-subscription').then(m => m.Ch44Subscription)
  },
  {
    path: 'ch45',
    loadComponent: () =>
      import('./chapters/ch45-loading/ch45-loading').then(m => m.Ch45Loading)
  },
  {
    path: 'ch46',
    loadComponent: () =>
      import('./chapters/ch46-signals/ch46-signals').then(m => m.Ch46Signals)
  },
  {
    path: 'ch47',
    loadComponent: () =>
      import('./chapters/ch47-sidenav/ch47-sidenav').then(m => m.Ch47Sidenav)
  },
  {
    path: 'ch48',
    loadComponent: () =>
      import('./chapters/ch48-toolbar/ch48-toolbar').then(m => m.Ch48Toolbar)
  },
  {
    path: 'ch49',
    loadComponent: () =>
      import('./chapters/ch49-radio-checkbox/ch49-radio-checkbox').then(m => m.Ch49RadioCheckbox)
  },
  {
    path: 'ch50',
    loadComponent: () =>
      import('./chapters/ch50-reactive-forms/ch50-reactive-forms').then(m => m.Ch50ReactiveForms)
  },
  {
    path: 'ch51',
    loadComponent: () =>
      import('./chapters/ch51-validators/ch51-validators').then(m => m.Ch51Validators)
  },
  {
    path: 'ch52',
    loadComponent: () =>
      import('./chapters/ch52-rwd/ch52-rwd').then(m => m.Ch52Rwd)
  },
  {
    path: 'ch53',
    loadComponent: () =>
      import('./chapters/ch53-rxjs/ch53-rxjs').then(m => m.Ch53Rxjs)
  }
];
