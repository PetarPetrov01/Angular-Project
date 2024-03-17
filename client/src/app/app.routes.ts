import { Routes } from '@angular/router';

import { HomeComponent } from './main/home/home.component';
import { ProductsComponent } from './main/products/products.component';
import { AddProductComponent } from './main/add-product/add-product.component';
import { ProductDetailsComponent } from './main/product-details/product-details.component';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { WishlistComponent } from './auth/wishlist/wishlist.component';
import { CartComponent } from './auth/cart/cart.component';

import { isGuestGuard, isUserGuard } from './guards/auth.guard';

const productRoutes = {
  path: 'products',
  children: [
    {
      path: '',
      component: ProductsComponent,
    },
    {
      path: ':id',
      children: [
        { path: '', component: ProductDetailsComponent },
        {
          path: 'edit',
          component: AddProductComponent,
          canActivate: [isUserGuard],
        },
      ],
    },
  ],
};

const authRoutes = {
  path: 'auth',
  children: [
    { path: 'login', component: LoginComponent, canActivate: [isGuestGuard] },
    {
      path: 'register',
      component: RegisterComponent,
      canActivate: [isGuestGuard],
    },
  ],
};

const profileRoutes = {
  path: 'profile',
  canActivate: [isUserGuard],
  children: [
    { path: '', component: ProfileComponent },
    {
      path: 'wishlist',
      component: WishlistComponent,
    },
  ],
}

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
  productRoutes,
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [isUserGuard],
  },
  { path: 'cart', component: CartComponent, canActivate: [isUserGuard] },
  authRoutes,
  profileRoutes
];
