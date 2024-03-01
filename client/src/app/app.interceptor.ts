import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { cookieName } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';

const { appUrl } = environment;

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      url: req.url.replace('/api', appUrl),
      withCredentials: true,
    });

    console.log(req.url);
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.authService.clearUserSession();
          this.router.navigate(['/auth/login'])
        } else {
          console.error(err);
        }
        return [err];
      })
    );
  }
}

export const appInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppInterceptor,
  multi: true,
};
