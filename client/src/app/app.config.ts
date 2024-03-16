import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { appInterceptorProvider } from './app.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MetaReducer, provideState, provideStore } from '@ngrx/store';
import {
  cartReducer,
  localStorageSyncReducer,
  testMetaReducer,
} from './main/cart/cart.reducer';

const metaReducers : Array<MetaReducer<any, any>> = [localStorageSyncReducer, testMetaReducer]

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    appInterceptorProvider,
    provideAnimationsAsync(),
    provideStore({cart: cartReducer}, {metaReducers}),
  ],
};
