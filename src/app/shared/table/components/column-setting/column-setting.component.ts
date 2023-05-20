import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { TableStore } from '../../table.store';
import { TableHeader, TableHeaderConfiguration } from '../../models';
import { TranslateModule } from '@ngx-translate/core';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgFor, AsyncPipe } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-column-setting',
    templateUrl: './column-setting.component.html',
    styleUrls: ['./column-setting.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NzDrawerModule,
        NzTableModule,
        NgFor,
        NzButtonModule,
        NzIconModule,
        NzInputModule,
        FormsModule,
        NzSwitchModule,
        NzWaveModule,
        AsyncPipe,
        TranslateModule,
    ],
})
export class ColumnSettingComponent<RecordType extends Record<string, any>> {
  readonly isShowSettingColumn$ = this.store.isShowSettingColumn$;
  position: string[] = ['left', 'right'];
  headers: TableHeader<RecordType>[] = [];

  readonly showSettings = toSignal(this.isShowSettingColumn$);

  readonly isShowSetting = this.store.selectSignal(x => x.isShowSettingColumn);

  readonly isShow$ = toObservable(this.isShowSetting);

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
