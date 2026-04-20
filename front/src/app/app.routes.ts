import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register').then(m => m.RegisterComponent)
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/auth/profile/profile').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },

  // ── Команда добавляет свои маршруты ниже ──────────────────────────────────
  // { path: 'home',      loadComponent: () => import('./features/items/home/home').then(m => m.Home) },
  // { path: 'items/:id', loadComponent: () => import('./features/items/detail/item-detail').then(m => m.ItemDetail) },
  // { path: 'claims',    loadComponent: () => import('./features/claims/claims').then(m => m.Claims), canActivate: [authGuard] },
  // ──────────────────────────────────────────────────────────────────────────

  {
    path: '**',
    redirectTo: 'login'
  }
];
