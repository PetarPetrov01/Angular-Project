import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { User } from '../types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  public user$ = this.user$$.asObservable();

  user: User | undefined;

  subscription: Subscription;

  constructor(private http: HttpClient) {
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
        this.user$$.next(user);
        this.setUser(user);
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
          this.user$$.next(user);
          this.setUser(user);
        })
      );
  }

  setUser(user: User) {
    localStorage.setItem('[user]', JSON.stringify(user));
  }

  getUser() {
    const user = localStorage.getItem('[user]');
    if(user){
      const parsedUser = JSON.parse(user)
      this.user$$.next(parsedUser)
      return parsedUser;
    } else {
      return null
    }
  }

  clearUser() {
    localStorage.removeItem('[user]');
    this.user$$.next(undefined)
  }
}
