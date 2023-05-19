import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NumberFilterComponent, TimeFilterComponent } from '.';
import { ColumnSettingComponent } from './components/column-setting/column-setting.component';
import {
  RowDetailDirective,
  TableCellDirective,
  TableFilterDirective,
} from './directives';
import { FilterLayoutComponent, TextFilterComponent } from './filters';
import { DateFilterComponent } from './filters/date-filter/date-filter.component';
import { ListFilterComponent } from './filters/list-filter/list-filter.component';
import { SelectFilterComponent } from './filters/select-filter/select-filter.component';
import { TableComponent } from './table.component';
import { CellTooltipsDirective } from './directives/cell-tooltips.directive';

const nzModules = [
  NzGridModule,
  NzButtonModule,
  NzTableModule,
  NzPaginationModule,
  NzIconModule,
  NzSelectModule,
  NzDatePickerModule,
  NzInputModule,
  NzDropDownModule,
  NzTimePickerModule,
  NzPopconfirmModule,
  NzEmptyModule,
  NzToolTipModule,
  NzRadioModule,
  NzInputNumberModule,
  NzDrawerModule,
  NzSwitchModule,
  NzResizableModule,
  NzCheckboxModule,
];

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        ...nzModules,
        TableComponent,
        TableCellDirective,
        TableFilterDirective,
        FilterLayoutComponent,
        TextFilterComponent,
        NumberFilterComponent,
        TimeFilterComponent,
        DateFilterComponent,
        SelectFilterComponent,
        RowDetailDirective,
        ColumnSettingComponent,
        ListFilterComponent,
        CellTooltipsDirective,
    ],
    exports: [
        TableComponent,
        TableCellDirective,
        TableFilterDirective,
        NumberFilterComponent,
        TimeFilterComponent,
        FilterLayoutComponent,
        TextFilterComponent,
        DateFilterComponent,
        SelectFilterComponent,
        RowDetailDirective,
        ListFilterComponent,
    ],
    providers: [],
})
export class TableModule {}
