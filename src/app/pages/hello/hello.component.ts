import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { RangeDirective } from 'src/app/core/directive/range.directive';
import { ButtonComponent } from 'src/app/shared/button/button.component';
import { DateRangePickerComponent } from 'src/app/shared/date-range-picker/date-range-picker.component';
import { InputComponent } from 'src/app/shared/input/input.component';
import { SelectComponent } from 'src/app/shared/select/select.component';
import { addDays } from 'date-fns';
@Component({
  selector: 'app-hello',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    DateRangePickerComponent,
    RangeDirective,
    SelectComponent,
    NzGridModule,
    ReactiveFormsModule,
  ],
  template: `
    <button class="m-2" app-button styleType="primary" disabled>Disabled button</button>

    <button class="m-2" app-button styleType="primary">Primary button</button>

    <button class="m-2" app-button styleType="link">Link button</button>

    <input class="m-2" app-input type="text" placeholder="input text" />

    <input class="m-2" app-input type="number" placeholder="input number" />

    <input class="m-2" app-input type="date" placeholder="input date" />

    <app-date-range-picker [formControl]="rangeControl" class="m-2"/>

    <label for="age">Choose age:</label>
    <select app-select name="age" id="age">
      <ng-container *appRange="[18, 25]; let num">
        <option [value]="num">{{ num }}</option>
      </ng-container>
    </select>
  `,
  styles: [``],
})
export class HelloComponent {
  readonly rangeControl = new FormControl([new Date, addDays(new Date, 7)]);

  constructor() {
    this.rangeControl.valueChanges.subscribe(console.log)
  }
}
