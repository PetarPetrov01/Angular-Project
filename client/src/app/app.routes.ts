import { Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { ProductsComponent } from './main/products/products.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AddProductComponent } from './main/add-product/add-product.component';
import { isGuestGuard, isUserGuard } from './guards/auth.guard';
import { ProductDetailsComponent } from './main/product-details/product-details.component';
import { CartComponent } from './main/cart/cart.component';
import { WishlistComponent } from './auth/wishlist/wishlist.component';
import { ProfileComponent } from './auth/profile/profile.component';

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
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [isUserGuard],
  },
  { path: 'cart', component: CartComponent, canActivate: [isUserGuard] },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent, canActivate: [isGuestGuard] },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [isGuestGuard],
      },
    ],
  },
  {
    path: 'profile',
    canActivate: [isUserGuard],
    children: [
      { path: '', component: ProfileComponent },
      {
        path: 'wishlist',
        component: WishlistComponent,
      },
    ],
  },
];
