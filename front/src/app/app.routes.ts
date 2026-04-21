import { Routes } from '@angular/router';
import { ItemList } from './components/item-list/item-list';
import { ItemDetail } from './components/item-detail/item-detail';
import { ItemCreate } from './components/item-create/item-create';
import { MyItems } from './components/my-items/my-items';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: ItemList },
  { path: 'items/:id', component: ItemDetail },
  { path: 'create', component: ItemCreate, canActivate: [authGuard] },
  { path: 'my-items', component: MyItems, canActivate: [authGuard] },
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
  { path: '**', redirectTo: '' }
];