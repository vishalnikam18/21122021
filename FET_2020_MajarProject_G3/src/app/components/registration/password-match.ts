import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: any = (control: FormGroup): ValidationErrors | null => {
  const password :any = control.get('password');
  const passconf :any= control.get('passconf');
  if (password.value && passconf.value) {
    return password.value !== passconf.value ? { 'passwordmatch': true } : null;
  }
  return null;
};