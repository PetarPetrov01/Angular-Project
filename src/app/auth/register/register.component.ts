import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatchPasswordsDirective } from '../../validators/match-passwords.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf, MatchPasswordsDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  @ViewChild('passwords',{static:false}) passwords! : NgModel;

  handleRegister(form: NgForm) {
    // console.log(form.getControl(this.passwords));
  }
}
