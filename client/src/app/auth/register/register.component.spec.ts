import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../shared/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { transition } from '@angular/animations';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;

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
    const emailErrors = fixture.debugElement.query(
      By.css('input[name="email"]~.errors')
    );
    const usernameErrors = fixture.debugElement.query(
      By.css('input[name="username"]~.errors')
    );

    expect(emailErrors.nativeElement.children[0].textContent).toContain(
      'Email is required!'
    );
    expect(usernameErrors.nativeElement.children[0].textContent).toContain(
      'Username is required'
    );
  }));

  it('should validate email', () => {
    const emailInput = fixture.debugElement.query(
      By.css('input[name="email"]')
    );

    emailInput.nativeElement.value = 'invalid@email';
    emailInput.triggerEventHandler('input', {
      target: emailInput.nativeElement,
    });
    emailInput.triggerEventHandler('blur');

    fixture.detectChanges();

    const emailErrors = fixture.debugElement.query(
      By.css('input[name="email"]~.errors')
    );
    expect(emailErrors.nativeElement.children[0].textContent).toContain(
      'Invalid email'
    );
  });

  it('should validate username length', async () => {
    const usernameInput = fixture.debugElement.query(
      By.css('input[name="username"]')
    );

    usernameInput.nativeElement.value = 'sd';
    usernameInput.triggerEventHandler('input', {
      target: usernameInput.nativeElement,
    });
    usernameInput.triggerEventHandler('blur');

    fixture.detectChanges();
    await fixture.whenStable();

    const usernameErrors = fixture.debugElement.query(
      By.css('input[name="username"]~.errors')
    );

    expect(usernameErrors.nativeElement.children[0].textContent).toContain(
      'Username must be atleast 5 characters long!'
    );
  });
});
