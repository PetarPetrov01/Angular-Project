import { JsonPipe, NgIf } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatchPasswordsDirective } from '../../validators/match-passwords.directive';
import { EmailValidateDirective } from '../../validators/email-validator.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf,
    MatchPasswordsDirective,
    EmailValidateDirective,
    JsonPipe
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnChanges{
  @ViewChild('passwords', { static: false }) passwords!: NgModel;
  @ViewChild('email', { static: false }) email!: NgModel;

  ngOnChanges(changes: SimpleChanges): void {

    console.log(this.email.errors)
  }
  handleRegister(form: NgForm) {
    // console.log(form.getControl(this.passwords));
  }
}
