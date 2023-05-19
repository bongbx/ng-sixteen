import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../input/input.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-range-picker',
  standalone: true,
  exportAs: 'appRangePicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, InputComponent],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DateRangePickerComponent)
    }
  ],
  template: `
    <input type="date" app-input />
    <input type="date" app-input />
  `,
  host: {
    '[class.picker]': `true`,
    '[class.picker-disabled]': `disabled`,
  },
  styles: [
    `
      .picker {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5715;
        list-style: none;
        font-feature-settings: 'tnum';
        position: relative;
        display: inline-flex;
        align-items: center;
        background: #fff;
        transition: border 0.3s, box-shadow 0.3s;
      }
    `,
  ],
})
export class DateRangePickerComponent implements ControlValueAccessor {
  writeValue([start, end]: [Date, Date]): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
