import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { TableStore } from '../../table.store';
import { AbstractTableFilterComponent } from '../abstract-table-filter.component';
import { getCountryCode, getFormatDateByCountryCode } from 'src/app/core';
import { FieldValueChangeModel } from '../../models';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
    selector: 'app-date-filter',
    templateUrl: './date-filter.component.html',
    styleUrls: ['./date-filter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NzDatePickerModule,
        FormsModule,
        TranslateModule,
    ],
})
export class DateFilterComponent<
  RecordType extends Record<string, any>,
> extends AbstractTableFilterComponent<RecordType, Date> {
  @Input() placeholder = '';

  readonly formatDate = getFormatDateByCountryCode(getCountryCode());

  constructor(
    protected override store: TableStore<RecordType>,
    private readonly cdr: ChangeDetectorRef,
  ) {
    super(store);
  }

  override onResetFilterItem(item: FieldValueChangeModel<Date> | null): void {
    this.value = item?.value;
    this.cdr.detectChanges();
  }
}
