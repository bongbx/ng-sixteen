import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { TableStore } from '../../table.store';
import { AbstractTableFilterComponent } from '../abstract-table-filter.component';
import { FieldValueChangeModel } from '../../models';
import { TranslateModule } from '@ngx-translate/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
    selector: 'app-select-filter',
    templateUrl: './select-filter.component.html',
    styleUrls: ['./select-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NzSelectModule,
        FormsModule,
        NgFor,
        TranslateModule,
    ],
})
export class SelectFilterComponent<
  RecordType extends Record<string, any>,
> extends AbstractTableFilterComponent<RecordType, string | boolean | number> {
  @Input() placeholder = 'TABLE.FILTERS.SEARCH';
  @Input() optionList: {
    text: string;
    value: string | boolean | number | Date;
  }[] = [];

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
