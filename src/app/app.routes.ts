// Main routing configuration
import { Routes } from '@angular/router';
import { TABS_ROUTES } from './pages/tabs/tabs.routes';

export const routes: Routes = [
  {
    path: '',
    children: TABS_ROUTES,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
