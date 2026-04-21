import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home';

import { ItemList } from './components/item-list/item-list';
import { ItemDetail } from './components/item-detail/item-detail';
import { ItemCreate } from './components/item-create/item-create';
import { MyItems } from './components/my-items/my-items';

import { authGuard } from './core/guards/auth.guard';
import {ProfileComponent} from './features/auth/profile/profile';
import {RegisterComponent} from './features/auth/register/register';
import {LoginComponent} from './features/auth/login/login';

export const routes: Routes = [
  // Редирект на логин по умолчанию
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Публичные страницы (доступны без логина)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


  // Защищённые страницы (только после логина)
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  },

  // Заглушки для будущих страниц
  {
    path: 'items',
    component: ItemList,
    canActivate: [authGuard]
  },
  {
    path: 'found',
    component: ItemList,
    canActivate: [authGuard]
  },
  {
    path: 'lost',
    component: ItemList,
    canActivate: [authGuard]
  },
  {
    path: 'create-item',
    component: ItemCreate,
    canActivate: [authGuard]
  },
  {
    path: 'my-items',
    component: MyItems,
    canActivate: [authGuard]
  },

  { path: 'item/:id', component: ItemDetail, canActivate: [authGuard] },

  // Заглушки для Claim и Messenger (пока не готовы)
  { path: 'claims', redirectTo: '/home', pathMatch: 'full' },
  { path: 'messages', redirectTo: '/home', pathMatch: 'full' },
  // Если ввели неправильный адрес — отправляем на логин
  { path: '**', redirectTo: '/login' }
];
