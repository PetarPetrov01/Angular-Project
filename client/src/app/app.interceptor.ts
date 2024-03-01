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

const { appUrl } = environment;

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('intercept')

    req = req.clone({
      url: req.url.replace('/api', appUrl),
      withCredentials: true,
    });

    console.log(req.url);
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.status === 401) {
          //ToDo relocate
          //ToDo install ngx-cookie-service to handle cookie deletion
          console.log('Unauthorizied');
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