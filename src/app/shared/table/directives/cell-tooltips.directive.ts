import { AfterViewInit, Directive, ElementRef, NgZone } from '@angular/core';

@Directive({
    selector: '[appCellTooltips]',
    standalone: true,
})
export class CellTooltipsDirective implements AfterViewInit {
  constructor(
    public readonly el: ElementRef<HTMLElement>,
    private readonly ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
        this.el.nativeElement.title = this.el.nativeElement.innerText;
    }, 100);
  }
}
