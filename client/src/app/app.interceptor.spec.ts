import { TestBed } from '@angular/core/testing';
import { HttpInterceptor } from '@angular/common/http';

import { AppInterceptor } from './app.interceptor';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';
import { ErrorService } from './shared/error/error.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('appInterceptor', () => {
  let interceptor: HttpInterceptor;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let routerMock: jasmine.SpyObj<Router>;
  let errorServiceMock: jasmine.SpyObj<ErrorService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AppInterceptor,
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['clearUserSession']),
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
        {
          provide: ErrorService,
          useValue: jasmine.createSpyObj('ErrorService', ['SetError']),
        },
      ],
    });

    interceptor = TestBed.inject(AppInterceptor);
    authServiceMock = TestBed.inject(
      AuthService
    ) as jasmine.SpyObj<AuthService>;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    errorServiceMock = TestBed.inject(
      ErrorService
    ) as jasmine.SpyObj<ErrorService>;
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
