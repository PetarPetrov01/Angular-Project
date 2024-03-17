import { JsonPipe, NgIf } from '@angular/common';
import {
  Component,
  OnDestroy,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {  Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../shared/auth.service';

import { MatchPasswordsDirective } from '../../shared/validators/match-passwords.directive';
import { EmailValidateDirective } from '../../shared/validators/email-validator.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf,
    MatchPasswordsDirective,
    EmailValidateDirective,
    JsonPipe,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnDestroy{
  subscription: Subscription | null;

  constructor(private authService: AuthService, private router: Router) {
    this.subscription = null;
  }

  handleRegister(form: NgForm) {
    if(form.invalid){
      return;
    }

    const { email, username, passwords: {password} } = form.value;

    form.controls['passwords'].setValue({password: '', rePassword: ''})
    form.controls['passwords'].markAsUntouched();

    this.subscription = this.authService.register(email, username, password).subscribe(()=>{
      this.router.navigate(['/'])
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
