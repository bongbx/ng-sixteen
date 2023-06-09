import { Directive, Input, TemplateRef } from '@angular/core';
import { TableCellContext } from './../models';

@Directive({
    selector: '[appTableCell]',
    standalone: true,
})
export class TableCellDirective<T = unknown> {
  @Input('appTableCell') type: string | undefined;

  constructor(public readonly template: TemplateRef<TableCellContext<T>>) {}
}
