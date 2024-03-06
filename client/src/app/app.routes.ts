import { Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { ProductsComponent } from './main/products/products.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddProductComponent } from './main/add-product/add-product.component';
import { isUserGuard } from './guards/auth.guard';
import { ProductDetailsComponent } from './main/product-details/product-details.component';

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
    children: [
      {
        path: '',
        component: ProductsComponent,
      },
      { path: ':id', component: ProductDetailsComponent },
    ],
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [isUserGuard],
  },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
];
