import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from 'src/app/shared/button/button.component';
import { DateRangePickerComponent } from 'src/app/shared/date-range-picker/date-range-picker.component';
import { InputComponent } from 'src/app/shared/input/input.component';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    DateRangePickerComponent,
  ],
  template: `
    <button app-button styleType="primary" disabled>Disabled button</button>

    <button app-button styleType="primary">Primary button</button>

    <button app-button styleType="link">Link button</button>

    <input app-input type="text" placeholder="input text"/>

    <input app-input type="number" placeholder="input number"/>
    
    <input app-input type="date" placeholder="input date"/>

    <app-date-range-picker/>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelloComponent {}
