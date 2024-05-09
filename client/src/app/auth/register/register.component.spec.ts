import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../shared/auth.service';
import { keyframes } from '@angular/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let mockForm: NgForm;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['register']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate email and username fields (required)', fakeAsync(async () => {
    const emailInput = fixture.debugElement.queryAll(
      By.css('input[name="email"]')
    )[0];
    const usernameInput = fixture.debugElement.query(
      By.css('input[name="username"]')
    );
    emailInput.nativeElement.value = '';
    emailInput.triggerEventHandler('blur');

    usernameInput.nativeElement.value = '';
    usernameInput.triggerEventHandler('blur');
    fixture.detectChanges();

    await fixture.whenStable();
    const emailErrors = fixture.debugElement.nativeElement.querySelector(
      'input[name="email"]~.errors'
    );
    const usernameErrors = fixture.debugElement.query(
      By.css('input[name="username"]~.errors')
    );

    expect(emailErrors.children[0].textContent).toContain('Email is required!');
    expect(usernameErrors.nativeElement.children[0].textContent).toContain('Username is required!');
  }));

});
