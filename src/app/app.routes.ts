import { Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { ProductsComponent } from './main/products/products.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
];
