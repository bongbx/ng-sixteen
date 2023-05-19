import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'select[app-select]',
  exportAs: 'appSelect',
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: ` <ng-content></ng-content> `,
  host: {
    class: 'ant-select',
  },
  styles: [
    `
      .ant-select {
        height: 32px;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
      }

      :focus-visible {
        outline: none;
      }
    `,
  ],
})
export class SelectComponent {}
