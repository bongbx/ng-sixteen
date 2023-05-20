import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { RangeDirective } from 'src/app/core/directive/range.directive';
import { ButtonComponent } from 'src/app/shared/button/button.component';
import { DateRangePickerComponent } from 'src/app/shared/date-range-picker/date-range-picker.component';
import { InputComponent } from 'src/app/shared/input/input.component';
import { SelectComponent } from 'src/app/shared/select/select.component';
import { addDays } from 'date-fns';
import { TableComponent, TableHeader } from 'src/app/shared';
import { InputCustomComponent } from 'src/app/shared/input-custom/input-custom.component';
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
    TableComponent,
    InputCustomComponent,
    FormsModule,
  ],
  template: `
    <button class="m-2" app-button styleType="primary" disabled>
      Disabled button
    </button>

    <button class="m-2" type="submit" app-button styleType="primary">Primary button</button>

    <button class="m-2" app-button styleType="link">Link button</button>
    
    <a class="m-2" href="https://viblo.asia/p/phan-biet-stateful-vs-stateless-components-V3m5WGGv5O7" app-button styleType="link">Link button</a>

    <input class="m-2" [value]="'abc'" type="text" placeholder="native input" />

    <input class="m-2" [value]="100" app-input type="text" placeholder="input text" />

    <input class="m-2" app-input type="number" placeholder="input number" />


    <app-date-range-picker [formControl]="rangeControl" class="m-2" />

    <app-date-range-picker [(ngModel)]="dates" (ngModelChange)="change($event)" class="m-2" />

    <label for="age">Choose age:</label>
    <select [(ngModel)]="age" app-select name="age" id="age">
      <ng-container *appRange="[18, 100]; let num">
        <option [value]="num">{{ num }}</option>
      </ng-container>
    </select>
  `,
  styles: [``],
})
export class HelloComponent {
  readonly rangeControl = new FormControl([new Date(), addDays(new Date(), 7)]);

  dates: Date[] = [new Date, new Date];

  headers: TableHeader<any>[] = [
    {
      label: 'A',
      field: 'a',
    },
  ];

  age = 10;

  ages = [
    18,
    24,
    23,
    21,
    19,
    20,
  ]

  records = [
    {
      a: 100,
    },
  ];

  constructor() {
    this.rangeControl.valueChanges.subscribe(console.log);
  }

  change(date: any) {
    console.log(date)
  }
}
