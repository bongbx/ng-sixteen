import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TableStore } from '../../table.store';
import { TableHeader, TableHeaderConfiguration } from '../../models';
@Component({
  selector: 'app-column-setting',
  templateUrl: './column-setting.component.html',
  styleUrls: ['./column-setting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnSettingComponent<RecordType extends Record<string, any>> {
  readonly isShowSettingColumn$ = this.store.isShowSettingColumn$;
  position: string[] = ['left', 'right'];
  headers: TableHeader<RecordType>[] = [];

  constructor(
    private readonly store: TableStore<RecordType>,
    private readonly cd: ChangeDetectorRef,
  ) {}

  onClose() {
    this.store.setShowSettingColumn(false);

    setTimeout(() => {
      this.cd.markForCheck();
    }, 0);
  }

  onOpen() {
    this.headers = [
      ...this.store.getHeaders().map(x => Object.assign({}, x)),
    ].filter(x => x.label);
  }

  move(
    array: TableHeaderConfiguration<RecordType>[],
    fromIndex: number,
    toIndex: number,
  ) {
    if (this.position.includes(this.headers[toIndex].position!)) {
      return;
    }

    if (toIndex >= array.length) {
      var k = toIndex - array.length + 1;
      while (k--) {
        array.push(undefined as any);
      }
    }
    array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
    array[0].isHidden = false;
  }

  onSave(array: TableHeader<RecordType>[]) {
    this.store.saveHeaderConfiguration(
      array.map(({ label, width, isHidden, field }) => ({
        label,
        width,
        isHidden,
        field,
      })),
    );

    setTimeout(() => {
      this.cd.markForCheck();
    }, 0);
  }

  resetSetting() {
    this.store.resetColumSettings();
  }
}
