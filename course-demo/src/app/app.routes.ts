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
  }
];
