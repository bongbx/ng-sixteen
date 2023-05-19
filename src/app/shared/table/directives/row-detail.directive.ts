import { Directive, TemplateRef } from '@angular/core';
import { RowDetailContext } from './../models';

@Directive({
    selector: '[appRowDetail]',
    standalone: true,
})
export class RowDetailDirective<T = unknown> {
  constructor(public readonly template: TemplateRef<RowDetailContext<T>>) {}
}
