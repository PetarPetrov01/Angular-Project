import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../shared/auth.service';

import { AuthComponent } from './auth.component';

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

  it('Should get the user on init', () => {
    authServiceMock.getUserStorage.and.returnValue({});
    
    component.ngOnInit();
    expect(authServiceMock.getUserStorage).toHaveBeenCalled();
  });
});
