import {
  BooleanInput,
  coerceBooleanProperty,
} from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


@Component({
  selector: 'button[app-button], a[app-button]',
  exportAs: 'appButton',
  preserveWhitespaces: false,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: ` <ng-content></ng-content> `,
  host: {
    class: 'ant-btn',
    '[class.ant-btn-primary]': `styleType === 'primary'`,
    '[class.ant-btn-dashed]': `styleType === 'dashed'`,
    '[class.ant-btn-link]': `styleType === 'link'`,
    '[class.ant-btn-text]': `styleType === 'text'`,
    '[attr.tabindex]': 'disabled ? -1 : (tabIndex === null ? null : tabIndex)',
    '[attr.disabled]': 'disabled || null',
  },
})
export class ButtonComponent {
  @Input() styleType:
    | 'primary'
    | 'default'
    | 'dashed'
    | 'link'
    | 'text'
    | null
    | undefined;

  // static ngAcceptInputType_disabled: BooleanInput;
  // @Input() @InputBoolean() disabled: boolean = false;

  // Using `coerceBooleanProperty` allows for the disabled value of a button to be set as
  // `<my-button disabled></my-button>` instead of `<my-button [disabled]="true"></my-button>`.
  // It also allows for a string to be passed like `<my-button disabled="true"></my-button>`.
  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;
}
