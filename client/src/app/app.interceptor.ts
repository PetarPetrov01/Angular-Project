import { Injectable, Provider } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, catchError } from 'rxjs';

import { AuthService } from './shared/auth.service';
import { environment } from '../environments/environment';
import { ErrorService } from './shared/error/error.service';

const { appUrl } = environment;

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private errorService: ErrorService
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
          this.router.navigate(['/auth/login']);
        } else {
          console.error(err);
          if(req.url.match(/.*\/products\/.+/g)){
            throw [err];
          }
          this.errorService.setError(err.error.message);
          throw [err];
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
