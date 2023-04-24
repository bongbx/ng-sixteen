import { Directive, TemplateRef } from '@angular/core';
import { RowDetailContext } from './../models';

@Directive({
  selector: '[appRowDetail]',
})
export class RowDetailDirective<T = unknown> {
  constructor(public readonly template: TemplateRef<RowDetailContext<T>>) {}
}
