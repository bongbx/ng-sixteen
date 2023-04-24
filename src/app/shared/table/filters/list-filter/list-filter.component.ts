import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { TableStore } from '../../table.store';
import { AbstractTableFilterComponent } from '../abstract-table-filter.component';
import { FieldValueChangeModel } from '../../models';

@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListFilterComponent<
  RecordType extends Record<string, any>,
> extends AbstractTableFilterComponent<RecordType, string | boolean | number> {
  @Input() placeholder = 'TABLE.FILTERS.SEARCH';
  @Input() options: { label: string; value: string; checked: boolean }[] = [];

  @Input() singleSelection = false;

  constructor(
    protected override store: TableStore<RecordType>,
    private readonly cdr: ChangeDetectorRef,
  ) {
    super(store);
  }

  override onFilterValueChange(value: string): void {
    this.value = value;
    this.store.setFilteringItem({ field: this.fieldName, value: value });
  }

  override onResetFilterItem(
    item: FieldValueChangeModel<string | boolean | number> | null,
  ): void {
    this.value = item?.value;
    this.cdr.detectChanges();
  }
}
