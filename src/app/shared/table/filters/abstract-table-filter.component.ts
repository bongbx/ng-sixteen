import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { FieldValueChangeModel, FilterValueChangeCallBack } from '../models';
import { TableStore } from '../table.store';

@Component({
  template: '',
})
export abstract class AbstractTableFilterComponent<
  RecordType extends Record<string, any>,
  ValueType,
> implements OnInit, OnDestroy
{
  @Input() fieldName!: string;
  @Input() value?: ValueType | null;

  protected readonly destroy$ = new Subject<void>();

  constructor(protected readonly store: TableStore<RecordType>) {}

  /**
   * @deprecated This callback will be removed soon.
   * We are now using ComponentStore to manage component communications.
   */
  @Input() onFilterCallback?: FilterValueChangeCallBack<any>;

  ngOnInit() {
    if (!this.fieldName) {
      throw new Error('Missing fieldName');
    }

    this.store.resetFilterItem$
      .pipe(
        takeUntil(this.destroy$),
        filter(item => !!item && item.field === this.fieldName),
      )
      .subscribe(item => this.onResetFilterItem(item));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /*
   * Derived classes can override this method to change the behaviour
   * of reset filter item.
   */
  protected onResetFilterItem(
    item: FieldValueChangeModel<ValueType> | null,
  ): void {
    this.value = item?.value;
  }

  onFilterValueChange(value: ValueType | null): void {
    this.store.setFilteringItem({ field: this.fieldName, value });
  }
}
