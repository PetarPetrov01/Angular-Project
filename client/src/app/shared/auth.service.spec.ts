import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject, of } from 'rxjs';

import { AuthService } from './auth.service';
import { User } from '../types/User';
import {  Store } from '@ngrx/store'; // Mocked for demonstration
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: jasmine.SpyObj<HttpClient>;
  let storeMock: jasmine.SpyObj<Store>; // Mocked NgRx store

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Store, useValue: jasmine.createSpyObj('Store', ['dispatch']) }, // Mock store
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    storeMock = TestBed.inject(Store) as jasmine.SpyObj<Store>; // Access mocked store
  });

  afterEach(() => {
    // Optional cleanup if needed
  });
});
