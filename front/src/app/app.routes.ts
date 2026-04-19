import { Routes } from '@angular/router';
import { ItemList } from './components/item-list/item-list';
import { ItemDetail } from './components/item-detail/item-detail';
import { ItemCreate } from './components/item-create/item-create';
import { MyItems } from './components/my-items/my-items';

export const routes: Routes = [
  { path: '', component: ItemList },
  { path: 'items/:id', component: ItemDetail },
  { path: 'create', component: ItemCreate },
  { path: 'my-items', component: MyItems },
  { path: '**', redirectTo: '' }
];
