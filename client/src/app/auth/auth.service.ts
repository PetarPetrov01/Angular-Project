import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { User } from '../types/User';
import { CookieService } from 'ngx-cookie-service';
import { cookieName } from './auth.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: User | undefined;

  subscription: Subscription;

  constructor(private http: HttpClient, private cookieService: CookieService) {
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
  }
}
