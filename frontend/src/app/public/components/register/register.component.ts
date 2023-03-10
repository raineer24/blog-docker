import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../_helpers/custom-validators';
import { UserService } from '../../services/user-service/user.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{

  form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required,]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, CustomValidators.passwordContainsNumber]),
    passwordConfirm: new FormControl(null, [Validators.required]),
  }, {
    validators: CustomValidators.passwordsMatching
  })

  constructor(private userService: UserService, private router: Router) { }

  register() {
    if (this.form.valid) {
      this.userService.create({
        name: this.name.value,
        email: this.email.value,
        password: this.password.value,
        username: this.username.value
      }).pipe(
        tap(() => this.router.navigate(['../login']))
      ).subscribe();
    }
  }

  get name(): FormControl{
    return this.form.get('name') as FormControl;
  }

  get email(): FormControl{
    return this.form.get('email') as FormControl;
  }

  get username(): FormControl {
    return this.form.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get passwordConfirm(): FormControl { 
    return this.form.get('passwordConfirm') as FormControl;
  }

}
