import { Component, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Subscription } from 'rxjs';

import { AuthService } from '../../shared/auth.service';
import { EmailValidateDirective } from '../../shared/validators/email-validator.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, EmailValidateDirective, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy{
  subscription: Subscription | null;

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
    if(this.loginForm.invalid){
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
