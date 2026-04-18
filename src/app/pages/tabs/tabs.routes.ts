import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const TABS_ROUTES: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () => import('../tab1-list-search/tab1.page').then(m => m.Tab1Page),
        data: { title: 'Inventory List' }
      },
      {
        path: 'tab2',
        loadComponent: () => import('../tab2-add-featured/tab2.page').then(m => m.Tab2Page),
        data: { title: 'Add Item' }
      },
      {
        path: 'tab3',
        loadComponent: () => import('../tab3-update-delete/tab3.page').then(m => m.Tab3Page),
        data: { title: 'Manage Items' }
      },
      {
        path: 'tab4',
        loadComponent: () => import('../tab4-privacy/tab4.page').then(m => m.Tab4Page),
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
