// Main routing configuration
import { Routes } from '@angular/router';
import { TabsPage } from './pages/tabs/tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () => import('./pages/tab1-list-search/tab1.page').then(m => m.Tab1Page),
        data: { title: 'Inventory List' }
      },
      {
        path: 'tab2',
        loadComponent: () => import('./pages/tab2-add-featured/tab2.page').then(m => m.Tab2Page),
        data: { title: 'Add Item' }
      },
      {
        path: 'tab3',
        loadComponent: () => import('./pages/tab3-update-delete/tab3.page').then(m => m.Tab3Page),
        data: { title: 'Manage Items' }
      },
      {
        path: 'tab4',
        loadComponent: () => import('./pages/tab4-privacy/tab4.page').then(m => m.Tab4Page),
        data: { title: 'Privacy & Security' }
      },
      {
        path: '',
        redirectTo: 'tab1',
        pathMatch: 'full'
      }
    ]
  }
];
