import { ChangeDetectionStrategy, Component, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'input[app-input], textarea[app-input]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: ` <ng-content></ng-content> `,
  host: {
    class: 'ant-input',
    '[class.ant-input-disabled]': 'disabled',
    '[class.ant-input-lg]': `size === 'large'`,
    '[class.ant-input-sm]': `size === 'small'`,
    '[attr.disabled]': 'disabled || null',
    '[class.ant-input-rtl]': `dir=== 'rtl'`,
  },
})
export class InputComponent {
  get disabled(): boolean {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value != null && `${value}` !== 'false';
  }
  _disabled = false;

  static ngAcceptInputType_disabled: BooleanInput;
  constructor(@Optional() @Self() public ngControl: NgControl) {}
}
