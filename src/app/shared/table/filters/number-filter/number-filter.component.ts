import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input
} from '@angular/core';
import { FieldValueChangeModel } from '../../models';
import { TableStore } from '../../table.store';
import { AbstractTableFilterComponent } from '../abstract-table-filter.component';

@Component({
  selector: 'app-number-filter',
  templateUrl: './number-filter.component.html',
  styleUrls: ['./number-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberFilterComponent<
  RecordType extends Record<string, any>,
> extends AbstractTableFilterComponent<RecordType, number> {
  @Input() placeholder = 'TABLE.FILTERS.SEARCH';

  constructor(
    protected override store: TableStore<RecordType>,
    private readonly cdr: ChangeDetectorRef,
  ) {
    super(store);
  }

  override onFilterValueChange(value: number | null): void {
    this.store.setFilteringItem({ field: this.fieldName, value });
  }

  override onResetFilterItem(item: FieldValueChangeModel<number> | null): void {
    this.value = item?.value;
    this.cdr.detectChanges();
  }
}
