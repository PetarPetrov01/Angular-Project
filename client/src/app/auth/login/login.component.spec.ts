import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../shared/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../../types/User';
import { of } from 'rxjs';
import { NgZone } from '@angular/core';
import { NotificationService } from '../../shared/notification/notification.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../../main/home/home.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let notificationServiceMock: jasmine.SpyObj<NotificationService>;

  let fb: jasmine.SpyObj<FormBuilder>;

  const mockUser: User = {
    _id: '123',
    email: 'testemail@gmail.com',
    username: 'testUser',
    wishlist: [],
  };

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['login']);
    fb = jasmine.createSpyObj('FormBuilder', ['group']);
    notificationServiceMock = jasmine.createSpyObj('NotificaionService', [
      'setNotification',
    ]);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule],
      imports: [
        LoginComponent,
        RouterTestingModule.withRoutes([
          { path: '', component: HomeComponent },
        ]),
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: FormBuilder, useValue: fb },
        { provide: NotificationService, useValue: notificationServiceMock },
      ],
    }).compileComponents();

    fb.group.and.returnValue(
      new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
      })
    );
    authServiceMock.login.and.returnValue(of(mockUser));

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create loginForm', () => {
    expect(component.loginForm).toBeTruthy();
  });

  it('loginForm should be invalid', () => {
    expect(component.loginForm.invalid).toBeTrue();
    expect(component.loginForm.get('email')?.hasError('required')).toBeTrue();
    expect(
      component.loginForm.get('password')?.hasError('required')
    ).toBeTrue();
  });

  it('should validate email', () => {
    component.loginForm.patchValue({
      email: 'wrong@email',
    });
    expect(component.loginForm.get('email')?.hasError('email')).toBeTruthy();
  });

  it('should not send the request if the inputs are empty', () => {
    component.handleLoginSubmit();
    expect(component.isLoading).toBeFalse();
  });

  it('should not call authService if email is invalid', () => {
    component.loginForm.patchValue({
      email: 'invalid@email',
    });

    expect(authServiceMock.login).not.toHaveBeenCalled();
  });
});
