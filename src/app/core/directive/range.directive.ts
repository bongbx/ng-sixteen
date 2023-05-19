import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRange]',
  standalone: true,
  exportAs: 'appRange'
})
export class RangeDirective {
  _range: number[] = [];

  @Input()
  set appRange([from, to]: [number, number]) {
    this.vcr.clear();
    this._range = this.generateRange(from, to);

    this._range.forEach((num) => {
      this.vcr.createEmbeddedView(this.tpl, {
        $implicit: num,
      });
    });
  }

  constructor(private vcr: ViewContainerRef, private tpl: TemplateRef<any>) {}

  private generateRange(from: number, to: number) {
    return this.arrayRange(from, to);
  }

  private arrayRange = (start: number, stop: number, step = 1) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );
}
