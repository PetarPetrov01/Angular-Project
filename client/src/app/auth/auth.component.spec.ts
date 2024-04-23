import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { AuthService } from '../shared/auth.service';
import { CookieService } from 'ngx-cookie-service';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let cookieServiceMock: jasmine.SpyObj<CookieService>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', [
      'getUserStorage',
      'setUserSubject',
      'getProfile',
      'clearUserSession',
    ]);
    cookieServiceMock = jasmine.createSpyObj('CookieService', ['get']);

    await TestBed.configureTestingModule({
      imports: [AuthComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: CookieService, useValue: cookieServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
