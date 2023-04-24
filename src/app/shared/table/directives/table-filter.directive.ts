import { Directive, Input, TemplateRef } from '@angular/core';
import { TableFilterContext } from '../models';

@Directive({
  selector: '[appTableFilter]',
})
export class TableFilterDirective<T = unknown, ValueType = string> {
  @Input('appTableFilter') type: string | undefined;

  constructor(
    public readonly template: TemplateRef<TableFilterContext<T, ValueType>>,
  ) {}
}
