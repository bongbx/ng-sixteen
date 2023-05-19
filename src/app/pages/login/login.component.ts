import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ValidatorRulesDirective } from 'src/app/core/directive/validation-rule.directive';
import { ButtonComponent } from 'src/app/shared/button/button.component';
import { InputComponent } from 'src/app/shared/input/input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NzFormModule,
    ReactiveFormsModule,
    InputComponent,
    NzInputModule,
    ButtonComponent,
    ValidatorRulesDirective,
    NzCheckboxModule,
  ],
  template: `
    <form
      nz-form
      [formGroup]="validateForm"
      class="login-form"
      (ngSubmit)="submitForm()"
    >
      <nz-form-item>
        <nz-form-control nzErrorTip="Please input your username!">
          <nz-input-group nzPrefixIcon="user">
            <input
              type="text"
              app-input
              formControlName="userName"
              placeholder="Username"
            />
          </nz-input-group>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-control nzErrorTip="Please input your Password!">
          <nz-input-group nzPrefixIcon="lock">
            <input
              type="password"
              app-input
              formControlName="password"
              placeholder="Password"
            />
          </nz-input-group>
        </nz-form-control>
      </nz-form-item>
      <div nz-row class="login-form-margin">
        <div nz-col [nzSpan]="12">
          <label nz-checkbox formControlName="remember">
            <span>Remember me</span>
          </label>
        </div>
        <div nz-col [nzSpan]="12">
          <a class="login-form-forgot">Forgot password</a>
        </div>
      </div>
      <button
        app-button
        class="login-form-button login-form-margin"
        [styleType]="'primary'"
      >
        Log in
      </button>
      Or
      <a>register now!</a>
    </form>
  `,
  styles: [
    `
      .login-form {
        max-width: 300px;
      }

      .login-form-margin {
        margin-bottom: 16px;
      }

      .login-form-forgot {
        float: right;
      }

      .login-form-button {
        width: 100%;
      }
    `,
  ],
})
export class LoginComponent {
  readonly validateForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    remember: new FormControl(false),
  });

  constructor(private readonly oidcSecurityService: OidcSecurityService) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
