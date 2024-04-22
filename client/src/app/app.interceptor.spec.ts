import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpInterceptor } from '@angular/common/http';

import { AppInterceptor } from './app.interceptor';

describe('appInterceptor', () => {
  let interceptor: HttpInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppInterceptor, HttpClientModule]
    });
    interceptor = TestBed.inject(AppInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
