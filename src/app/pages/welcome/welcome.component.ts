import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { ValidatorRulesDirective } from '../../core/directive/validation-rule.directive';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
    selector: 'app-welcome',
    template: `
    <div>Nz Form</div>
    <h2 style="text-align: center;">Form valid: {{ formGroup.valid }}</h2>
    <form [formGroup]="formGroup" autocomplete="false">
      <nz-form-item>
        <nz-form-label [nzSpan]="6" nzFor="name">Name</nz-form-label>
        <nz-form-control [nzSpan]="14">
          <input
            id="name"
            type="text"
            formControlName="name"
            nz-input
            [appValidatorRules]="nameRules"
          />
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label [nzSpan]="6" nzFor="email">Email</nz-form-label>
        <nz-form-control nzSpan="14">
          <input
            nz-input
            autocomplete="off"
            formControlName="email"
            [appValidatorRules]="emailRules"
            id="email"
          />
        </nz-form-control>
      </nz-form-item>

      <nz-form-item>
        <nz-form-label [nzSpan]="6" nzFor="age">Age</nz-form-label>
        <nz-form-control nzSpan="14">
          <nz-input-number
            formControlName="age"
            style="width: 100%"
            id="age"
            autocomplete="off"
            [appValidatorRules]="ageRules"
          ></nz-input-number>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
    styles: [
        `
      .error-message {
        color: red;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NzGridModule,
        NzFormModule,
        NzInputModule,
        ValidatorRulesDirective,
        NzInputNumberModule,
    ],
})
export class WelcomeComponent {
  readonly nameRules = [
    (value: string) => !!value || 'Name is required',
    (value: string) => value.length < 15 || 'Name maxlength is 15',
    (value: string) => value.length > 6 || 'Name minlength is 6',
  ];

  readonly ageRules = [
    (value: number) => !!value || 'Age is required',
    (value: number) => value < 35 || 'Age must be less than 35',
    (value: number) => value >= 18 || 'Age must be more than 18',
  ];

  readonly emailRules = [
    (value: string) => !!value || 'Email is required',
    (value: string) =>
      this.isValidEmail(value) ||
      'The email address you entered is not valid. Please check for typos and try again.',
  ];

  readonly formGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    age: new FormControl(0),
  });

  private isValidEmail(email: string) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
}
