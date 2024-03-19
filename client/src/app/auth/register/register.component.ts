import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../shared/auth.service';

import { MatchPasswordsDirective } from '../../shared/validators/match-passwords.directive';
import { EmailValidateDirective } from '../../shared/validators/email-validator.directive';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    MatchPasswordsDirective,
    EmailValidateDirective,
    CommonModule,
    LoaderComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnDestroy {
  subscription: Subscription | null;

  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.subscription = null;
  }

  handleRegister(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const {
      email,
      username,
      passwords: { password },
    } = form.value;

    form.controls['passwords'].setValue({ password: '', rePassword: '' });
    form.controls['passwords'].markAsUntouched();

    this.isLoading = true;

    this.subscription = this.authService
      .register(email, username, password)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.isLoading = false;
        },
        error: (err) => {
        //mock delay to visualize loader
          setTimeout(() => {
            this.isLoading = false;
          }, 2000);
        },
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
