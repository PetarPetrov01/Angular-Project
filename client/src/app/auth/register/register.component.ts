import { JsonPipe, NgIf } from '@angular/common';
import {
  Component,
  OnChanges,
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
export class RegisterComponent implements OnChanges {
  @ViewChild('passwords', { static: false }) passwords!: NgModel;
  @ViewChild('email', { static: false }) email!: NgModel;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {}
  handleRegister(form: NgForm) {
    if(form.invalid){
      return;
    }

    const { email, username, passwords: {password} } = form.value;
    this.authService.register(email, username, password).subscribe(()=>{
      this.router.navigate(['/'])
    })
  }
}
