import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormControl, FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  handleRegister(form: NgForm) {
    console.log(form.value);
  }
}
