import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { FieldValueChangeModel } from '../../models';
import { TableStore } from '../../table.store';
import { AbstractTableFilterComponent } from '../abstract-table-filter.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
    selector: 'app-text-filter',
    templateUrl: './text-filter.component.html',
    styleUrls: ['./text-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NzInputModule,
        FormsModule,
        TranslateModule,
    ],
})
export class TextFilterComponent<
  RecordType extends Record<string, any>,
> extends AbstractTableFilterComponent<RecordType, string> {
  @Input() placeholder = 'TABLE.FILTERS.SEARCH';

  constructor(store: TableStore<RecordType>, private cdr: ChangeDetectorRef) {
    super(store);
  }

  override onFilterValueChange(value: string | null): void {
    this.store.setFilteringItem({ field: this.fieldName, value: value });
  }

  override onResetFilterItem(item: FieldValueChangeModel<string> | null): void {
    this.value = item?.value;
    this.cdr.detectChanges();
  }
}
