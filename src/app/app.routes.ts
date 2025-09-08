import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'country/:code',
    loadComponent: () => import('./pages/country/country.component').then(m => m.CountryComponent)
  },
  { path: '**', redirectTo: '' }
];
