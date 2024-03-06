import { JsonPipe, NgIf } from '@angular/common';
import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import {  Router, RouterLink } from '@angular/router';
import { MatchPasswordsDirective } from '../../validators/match-passwords.directive';
import { EmailValidateDirective } from '../../validators/email-validator.directive';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

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
    this.subscription = this.authService.register(email, username, password).subscribe(()=>{
      this.router.navigate(['/'])
    })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
