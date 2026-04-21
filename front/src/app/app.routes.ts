import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    // ✅ FIX: было redirectTo: 'home' — маршрут не существует → бесконечный цикл
    // Временно редиректим на /profile пока команда не добавит /home
    path: '',
    redirectTo: 'profile',
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

  // ── Команда раскомментирует когда добавит свои компоненты ─────────────────
  // { path: 'home', loadComponent: () => import('./features/items/home/home.component').then(m => m.HomeComponent) },
  // { path: 'items/:id', loadComponent: () => import('./features/items/detail/item-detail.component').then(m => m.ItemDetailComponent) },
  // { path: 'claims', loadComponent: () => import('./features/claims/claims.component').then(m => m.ClaimsComponent), canActivate: [authGuard] },
  // ──────────────────────────────────────────────────────────────────────────

  {
    // ✅ Когда маршрут не найден — неавторизованные идут на /login
    path: '**',
    redirectTo: 'login'
  }
];
