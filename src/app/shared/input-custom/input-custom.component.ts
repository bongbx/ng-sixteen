import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-custom',
  standalone: true,
  changeDetection:ChangeDetectionStrategy.OnPush,
  template: `
    <input class="input" [value]="value" type="email">
  `,
  styles: [
    `
    .input { 
      border: 1px solid #d9d9d9;
    border-radius: 2px;
    }
    `
  ]
})
export class InputCustomComponent {

  @Input()
  value = '';
}
