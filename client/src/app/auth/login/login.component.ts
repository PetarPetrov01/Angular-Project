import { Component, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from '../../shared/auth.service';
import { EmailValidateDirective } from '../../shared/validators/email-validator.directive';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    EmailValidateDirective,
    NgIf,
    LoaderComponent,
    LazyLoadImageModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  subscription: Subscription | null;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.subscription = null;
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  handleLoginSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;

    const { email, password } = this.loginForm.value;

    this.loginForm.reset()

    this.authService.login(email!, password!).subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.isLoading = false;
      },
      error: () => {
        //mock delay to visualize loader
        setTimeout(()=>{
          this.isLoading = false;
        },2000)
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
