import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../input/input.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { format } from 'date-fns';

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
      useExisting: forwardRef(() => DateRangePickerComponent),
    },
  ],
  template: `
    <input
      type="date"
      [value]="start"
      app-input
      [disabled]="disabled"
      (change)="startChange($event)"
    />
    <input
      type="date"
      [value]="end"
      app-input
      [disabled]="disabled"
      (change)="endChange($event)"
    />
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
  protected onChange = (_: (Date | null)[]) => {};

  protected onTouched = () => {};

  value: (Date | null)[] = [];

  disabled = false;

  readonly dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  get start() {
    return this.value[0] ? format(new Date(this.value[0]), 'yyyy-MM-dd') : null;
  }

  get end() {
    return this.value[1] ? format(new Date(this.value[1]), 'yyyy-MM-dd') : null;
  }

  constructor(private readonly cd: ChangeDetectorRef) {

  }

  writeValue(value: [Date, Date]): void {
    if(!value) {
      return;
    }
    const [start, end] = value;

    if (start && end) {
      this.value = [start, end];
      this.cd.detectChanges();
    }
  }

  registerOnChange(fn: (_: (Date | null)[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cd.detectChanges();
  }

  startChange(start: any) {
    this.onChange([this.toDate(start.target.value), this.value[1]]);
  }

  endChange(end: any) {
    this.onChange([this.value[0], this.toDate(end.target.value)]);
  }

  private toDate(value: string) {
    console.log(value);
    if(!value) {
      return null;
    }

    const date = new Date(value);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    } as Intl.DateTimeFormatOptions;
    return new Date(date.toLocaleDateString('en-US', options));
  }
}
