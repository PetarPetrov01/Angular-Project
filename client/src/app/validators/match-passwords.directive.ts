import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';

@Directive({
  selector: '[appMatchPasswords]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MatchPasswordsDirective,
      multi: true,
    },
  ],
})
export class MatchPasswordsDirective implements Validator {
  constructor() {}

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const group = control;
    const passOne = group.value['password'];
    const passTwo = group.value['rePassword'];

    return passOne == passTwo ? null : { passwords: 'Passwords do not match!' };
  }
}
