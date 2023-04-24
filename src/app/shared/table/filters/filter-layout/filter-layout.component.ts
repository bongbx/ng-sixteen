import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-filter-layout',
  templateUrl: './filter-layout.component.html',
  styleUrls: ['./filter-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterLayoutComponent {
  @Input() submitTitle = 'TABLE.FILTERS.SEARCH';
  @Input() clearTitle = 'TABLE.FILTERS.CLEAR';

  @Output() readonly submitFilter = new EventEmitter<void>();
  @Output() readonly clearFilter = new EventEmitter<void>();

  onSubmit(): void {
    this.submitFilter.emit();
  }
  onClear(): void {
    this.clearFilter.emit();
  }
}
