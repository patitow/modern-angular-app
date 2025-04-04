// src/app/app.routes.ts
import { Routes } from '@angular/router'

export const appRoutes: Routes = [
  { path: 'home', loadComponent: () => import('../pages/home/home.component').then(m => m.HomeComponent) },
  {
    path: 'about',
    loadComponent: () => import('../pages/about/about.component').then(m => m.AboutComponent),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
]
