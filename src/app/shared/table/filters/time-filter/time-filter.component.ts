import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { distinct, takeUntil } from 'rxjs/operators';
import { FieldValueChangeModel } from '../../models';
import { TableStore } from '../../table.store';
import { AbstractTableFilterComponent } from '../abstract-table-filter.component';
import { Time, getCountryCode, getFormatTimeByCountryCode } from 'src/app/core';

@Component({
  selector: 'app-time-filter',
  templateUrl: './time-filter.component.html',
  styleUrls: ['./time-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeFilterComponent<RecordType extends Record<string, any>>
  extends AbstractTableFilterComponent<RecordType, Date>
  implements OnInit
{
  private valueChanged$ = new Subject<Date | null>();

  constructor(
    protected override store: TableStore<RecordType>,
    private readonly cdr: ChangeDetectorRef,
  ) {
    super(store);
  }

  readonly formatTime = getFormatTimeByCountryCode(getCountryCode());

  override ngOnInit(): void {
    super.ngOnInit();

    // TimePicker component tends to emit value twice after selecting
    // so we need to use distinct here to remove duplication.
    this.valueChanged$
      .pipe(
        takeUntil(this.destroy$),
        distinct(v => v?.getTime()),
      )
      .subscribe(value => {
        this.store.setFilteringItem({
          field: this.fieldName,
          value: value
            ? ({
                hours: value.getHours(),
                minutes: value.getMinutes(),
              } as Time)
            : undefined,
        });
      });
  }

  override onFilterValueChange(value: Date | null): void {
    this.value = value;
    this.valueChanged$.next(value);
  }

  override onResetFilterItem(item: FieldValueChangeModel<Date> | null): void {
    this.value = item?.value;
    this.cdr.detectChanges();
  }
}
