import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { cookieName } from '../auth/auth.component';

import { APIProduct, PopulatedProduct } from '../types/Product';
import { User } from '../types/User';
import { Store } from '@ngrx/store';

import * as CartActions from '../auth/cart/cart.actions'

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: User | undefined;

  subscription: Subscription;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private store: Store
  ) {
    this.subscription = this.user$$.subscribe((user) => {
      this.user = user;
    });
  }

  get isLogged(): boolean {
    return !!this.user;
  }

  login(email: string, password: string) {
    return this.http.post<User>('/api/auth/login', { email, password }).pipe(
      tap((user) => {
        this.setUserSubject(user);
        this.setUserStorage(user);
      })
    );
  }

  register(email: string, username: string, password: string) {
    return this.http
      .post<User>('/api/auth/register', {
        email,
        username,
        password,
      })
      .pipe(
        tap((user) => {
          this.setUserSubject(user);
          this.setUserStorage(user);
        })
      );
  }

  getProfile() {
    return this.http.get<User>('/api/auth/profile').subscribe((user) => {
      this.setUserSubject(user);
      this.setUserStorage(user);
    });
  }

  editProfile(username: string, email: string){
    return this.http.patch<User>('/api/auth/profile',{email,username}).subscribe((user) => {
      this.setUserSubject(user);
      this.setUserStorage(user);
    });
  }

  getWishlist() {
    return this.http.get<[PopulatedProduct]>('/api/auth/wishlist');
  }

  getOwnProducts() {
    return this.http.get<[APIProduct]>('/api/auth/posts');
  }

  setUserSubject(user: User) {
    this.user$$.next(user);
  }

  setUserStorage(user: User) {
    localStorage.setItem('[user]', JSON.stringify(user));
  }

  getUserStorage() {
    const user = localStorage.getItem('[user]');
    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }

  clearUserSession() {
    localStorage.removeItem('[user]');
    this.user$$.next(undefined);
    this.cookieService.delete(cookieName, '/');
    this.store.dispatch(CartActions.resetState());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
