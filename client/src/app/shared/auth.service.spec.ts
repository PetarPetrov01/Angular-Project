import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { BehaviorSubject, of } from 'rxjs';

import { AuthService } from './auth.service';
// import { User } from '../types/User';
import {  Store } from '@ngrx/store'; 
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../types/User';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: jasmine.SpyObj<HttpClient>;
  let storeMock: jasmine.SpyObj<Store>; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Store, useValue: jasmine.createSpyObj('Store', ['dispatch']) }, 
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    storeMock = TestBed.inject(Store) as jasmine.SpyObj<Store>; 
  });

  it('Test setup', ()=>{
    expect(true).toBeTruthy();
  })

  it('should return false when no user is logged in',()=>{
    expect(service.isLogged).toBeFalsy();
  })

  it('should return true if the user is logged in',()=>{
    const mockUser: User = {
      _id:'123',
      email: 'test@mail.com',
      username:'Test1',
      wishlist: []
    }
    service.setUserSubject(mockUser);
    expect(service.isLogged).toBeTruthy();
  })
  
});
