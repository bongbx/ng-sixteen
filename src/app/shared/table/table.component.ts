import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import * as equal from 'fast-deep-equal';
import { NzResizeEvent, NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzTableQueryParams, NzTableSize, NzTableSortOrder, NzTableModule } from 'ng-zorro-antd/table';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  take,
  takeUntil,
} from 'rxjs/operators';
import {
  RowDetailDirective,
  TableCellDirective,
  TableFilterDirective,
} from './directives';
import {
  FieldValueChangeModel,
  FilterParamModel,
  PageInfo,
  QueryParamsChangedModel,
  RowDetailContext,
  SortParamModel,
  TableCellContext,
  TableFilterContext,
  TableHeader,
} from './models';
import { TableStore } from './table.store';
import { ColumnSettingComponent } from './components/column-setting/column-setting.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { ListFilterComponent } from './filters/list-filter/list-filter.component';
import { DateFilterComponent } from './filters/date-filter/date-filter.component';
import { TimeFilterComponent } from './filters/time-filter/time-filter.component';
import { NumberFilterComponent } from './filters/number-filter/number-filter.component';
import { SelectFilterComponent } from './filters/select-filter/select-filter.component';
import { TableFilterDirective as TableFilterDirective_1 } from './directives/table-filter.directive';
import { TextFilterComponent } from './filters/text-filter/text-filter.component';
import { TableCellDirective as TableCellDirective_1 } from './directives/table-cell.directive';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { TranslateModule } from '@ngx-translate/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { CellTooltipsDirective } from './directives/cell-tooltips.directive';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgIf, NgFor, NgTemplateOutlet, AsyncPipe, DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    providers: [TableStore],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        NzButtonModule,
        NzWaveModule,
        NzPopconfirmModule,
        NzToolTipModule,
        NzIconModule,
        NzTableModule,
        NgFor,
        NzResizableModule,
        NzDropDownModule,
        NzRadioModule,
        CellTooltipsDirective,
        NgTemplateOutlet,
        NzGridModule,
        NzMenuModule,
        TranslateModule,
        NzPaginationModule,
        TableCellDirective_1,
        TextFilterComponent,
        TableFilterDirective_1,
        SelectFilterComponent,
        NumberFilterComponent,
        TimeFilterComponent,
        DateFilterComponent,
        ListFilterComponent,
        NzEmptyModule,
        ColumnSettingComponent,
        AsyncPipe,
        DecimalPipe,
    ],
})
export class TableComponent<RecordType extends Record<string, any>, IdType>
  implements AfterContentInit, AfterViewInit, OnInit, OnChanges, OnDestroy
{
  private _checkedKeys: Set<IdType> = new Set<IdType>();

  private _checkedData = new Map<string, RecordType>();

  private _headers: TableHeader<RecordType>[] = [];

  get checkedKeys() {
    return Array.from(this._checkedKeys).filter(x => x);
  }
  @Input() set checkedKeys(value: IdType[]) {
    this._checkedKeys = new Set(value.filter(x => x));
    this.refreshCheckedStatus();
  }

  get checkedData() {
    return Array.from(this._checkedData)
      .map(([_, value]) => value)
      .filter(x => x);
  }
  @Input() set checkedData(value: RecordType[]) {
    this._checkedData = new Map(value.map(v => [v[this.idField], v]));
  }

  get headers() {
    return this._headers;
  }

  @Input() set headers(value: TableHeader<RecordType>[]) {
    setTimeout(() => {
      this.store.setHeaders(value || []);
    }, 10);
  }
  @Input({ required: true }) records: readonly RecordType[] = [];
  @Input() pageInfo!: PageInfo;
  @Input() queryParams?: QueryParamsChangedModel<RecordType>;
  @Input() isBusy: boolean | null = false;
  @Input() idField: keyof RecordType = 'ID';
  @Input() deleteMessage = 'TABLE.DELETE_MESSAGE';
  @Input() deleteTooltip = 'TOOLTIP.DELETE';
  @Input() deletePopconfirmTitle = 'TABLE.DELETE_CONFIRM_TITLE';
  @Input() deletePopconfirmOK = 'ACTION.OK';
  @Input() deletePopconfirmCancel = 'ACTION.CANCEL';
  @Input() selectedTitle = 'TABLE.SELECT_CHECKBOX_TO_SEE_OPTIONS';
  @Input() notFoundContent = 'TABLE.NO_CONTENT';
  @Input() multipleSorter = true;
  @Input() isRowSelectable = true;
  @Input() showFooterActions = true;
  @Input() showSelectedTitle = false;
  @Input() showDeleteAction = true;
  @Input() disableDelete = false;
  @Input() allowSelectMultipleRow = true;
  @Input() allowSelectAllRows = true;
  @Input() defaultExpandRows: string[] = [];
  @Input() allowCustomStyleRows: boolean = false;
  @Input() showPopupDelete: boolean = true;
  @Input() tableSize: NzTableSize = 'small';
  @Input() scrollDefinition: {
    x?: string | null;
    y?: string | null;
  } = { y: 'calc(100vh - 344px)' };
  @Input() ellipsis = true;

  @Input() disableCheckSet: Set<IdType> = new Set<IdType>();

  @Output() readonly paginationChange = new EventEmitter<PageInfo>();
  @Output() readonly checkedKeysChange = new EventEmitter<IdType[]>();
  @Output() readonly checkedDataChange = new EventEmitter<RecordType[]>();
  @Output() readonly removeSelectedIds = new EventEmitter<IdType[]>();
  @Output() readonly removeSelectedData = new EventEmitter<RecordType[]>();
  @Output() readonly queryParamsChanged = new EventEmitter<
    QueryParamsChangedModel<RecordType>
  >();

  @ContentChildren(TableCellDirective) readonly customCells:
    | QueryList<TableCellDirective<RecordType>>
    | undefined;

  @ContentChildren(TableFilterDirective) readonly customFilters:
    | QueryList<TableFilterDirective<RecordType>>
    | undefined;

  @ViewChildren(TableFilterDirective) readonly defaultFilters:
    | QueryList<TableFilterDirective<RecordType>>
    | undefined;

  @ViewChildren(TableCellDirective) readonly defaultCells:
    | QueryList<TableCellDirective<RecordType>>
    | undefined;

  cellTemplates: Record<string, TemplateRef<TableCellContext<RecordType>>> = {};

  filterTemplates: Record<
    string,
    TemplateRef<TableFilterContext<RecordType, keyof RecordType & string>>
  > = {};

  private _rowDetailTemplate?: TemplateRef<RowDetailContext<RecordType>>;

  get rowDetailTemplate() {
    return this._rowDetailTemplate;
  }
  @ContentChild(RowDetailDirective)
  set rowDetailTemplateSetter(
    value: RowDetailDirective<RecordType> | undefined,
  ) {
    this._rowDetailTemplate = value?.template;
  }

  allRecordsChecked = false;
  indeterminate = false;
  visibilities: {
    [headerField: string]: boolean;
  } = {};
  expandAbilities: {
    [rowIndex: number]: boolean;
  } = {};

  readonly defaultSortDirections: NzTableSortOrder[] = [
    'ascend',
    'descend',
    null,
  ];

  headerTrackByKey = (index: number, item: TableHeader<RecordType>): number => {
    return index;
  };

  recordTrackByKey = (index: number, item: RecordType): string => {
    return item[this.idField];
  };

  private filteringItem$ = this.store.filteringItem$;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly ngZone: NgZone,
    private readonly store: TableStore<RecordType>,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['records'] && changes['records'].currentValue?.length) {
      this.expandAbilities = {};
      this.records.forEach((record, index) => {
        this.expandAbilities[index] = this.defaultExpandRows.includes(
          record[this.idField],
        );
      });
      this.refreshCheckedStatus();
    }
  }

  ngOnInit(): void {
    this.store.filterTrigger$
      .pipe(
        takeUntil(this.destroy$),
        filter(item => !!item),
        // debounceTime(100),
      )
      .subscribe(item => item && this.onFilterTriggered(item));

    this.store.headers$
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged((a, b) => equal(a, b)),
      )
      .subscribe(headers => {
        this._headers = headers.filter(x => !x.isHidden);
        this.cdr.detectChanges();
      });
  }

  ngAfterContentInit(): void {
    this.customCells?.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.mapCellTemplates());
    this.mapCellTemplates();

    this.customFilters?.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.mapFilterTemplates());
    this.mapFilterTemplates();
  }

  ngAfterViewInit(): void {
    this.defaultCells?.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.mapCellTemplates());
    this.mapCellTemplates();

    this.defaultFilters?.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.mapFilterTemplates());
    this.mapFilterTemplates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onResize({ width }: NzResizeEvent, col: string): void {
    this.store.updateHeader([col, width]);
  }

  readonly isChecked = (id: IdType) => this._checkedKeys.has(id);

  toggleFilter(isVisible: boolean, headerField?: keyof RecordType | ''): void {
    this.visibilities = {
      ...this.visibilities,
      [headerField || '']: isVisible,
    };
    this.cdr.markForCheck();
  }

  onPaginationChanged(page: number, pageSize: number): void {
    const totalPage = Math.ceil(this.pageInfo.totalSize / pageSize);
    this.pageInfo.page = page;
    this.pageInfo.pageSize = pageSize;
    this.paginationChange.emit({
      page: Math.min(page, totalPage),
      pageSize,
      totalSize: this.pageInfo.totalSize,
    });
  }

  onItemChecked(id: IdType, checked: boolean): void {
    if (!this.allowSelectMultipleRow) {
      for (const key of this._checkedKeys.keys()) {
        this.updateCheckedSet(key, false);
      }
    }
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();

    this.checkedKeysChange.emit(this.checkedKeys);
  }

  onRecordChecked(record: RecordType, checked: boolean): void {
    if (!this.allowSelectMultipleRow) {
      for (const key of this._checkedData.values()) {
        this.updateCheckedData(key, false);
      }
    }
    this.updateCheckedData(record, checked);

    this.checkedDataChange.emit(this.checkedData);
  }

  onAllChecked(checked: boolean): void {
    this.records.forEach(record => {
      this.updateCheckedSet(record[this.idField], checked);
      this.updateCheckedData(record, checked);
    });

    this.checkedKeysChange.emit(this.checkedKeys);
    this.checkedDataChange.emit(this.checkedData);

    this.refreshCheckedStatus();
  }

  onItemCheckedInline(record: RecordType, checked: boolean) {
    if (this.isRowSelectable && !this.allowSelectMultipleRow) {
      this.onItemChecked(record[this.idField], checked);
      this.onRecordChecked(record, checked);
    }
  }

  clearAllSelectedRows(): void {
    this._checkedKeys.clear();
    this._checkedData.clear();
    this.checkedKeysChange.next([]);
    this.checkedDataChange.next([]);
  }

  onRemoveSelectedIds(): void {
    this.removeSelectedIds.emit(this.checkedKeys);
    this.removeSelectedData.emit(this.checkedData);
    // this.onAllChecked(false);
  }

  onClearFilter(field: string | keyof RecordType): void {
    if (this.queryParams) {
      const filterDict: FilterParamModel<RecordType> =
        this.queryParams.filter || {};
      const newFilterDict = { ...filterDict };

      delete newFilterDict[field];

      this.updateQueryParams({
        sorts: [...this.queryParams.sorts],
        filter: newFilterDict,
      });
    }

    this.toggleFilter(false, field);
    this.store.resetFilterItem({ field: field.toString(), value: null });
    this.store.setFilteringItem(undefined);
  }

  onSubmitFilter(field: string | keyof RecordType): void {
    this.applyFilter(field);
    this.toggleFilter(false, field);
  }

  onVisibleFilterChange(isVisible: boolean, field?: keyof RecordType): void {
    if (field) {
      this.visibilities = {
        ...this.visibilities,
        [field]: isVisible,
      };
    }

    if (!isVisible) {
      this.applyFilter(field);
    }
  }

  isIconActive(headerField: (string | keyof RecordType) | undefined): boolean {
    const { field: key, isHidden } = this.store.findHeader(
      x => x.field && x.field === headerField,
    ) || { field: '' };
    const filterDict = this.queryParams?.filter;

    if (!key || !filterDict) {
      return false;
    }

    const value = filterDict[key];
    // check value != undefined <=> value not empty or null
    return Array.isArray(value) ? !!value.length : value != undefined;
  }

  onSizeChange(size: NzTableSize): void {
    this.tableSize = size;
  }

  /**
   * @deprecated This callback will be removed soon.
   * We are now using ComponentStore to manage component communications.
   */
  // Must be arrow function because it has been passed into another scoped.
  onFilterCallback = (model: FieldValueChangeModel<any> | undefined): void => {
    this.store.setFilteringItem(model);
  };

  onQueryParamsChange(event: NzTableQueryParams): void {
    this.updateQueryParams({
      sorts: event.sort
        .filter(x => x.value)
        .map<SortParamModel<RecordType>>(x => ({
          ...x,
          value: x.value === 'ascend' ? 'asc' : 'desc',
        })),
      filter: {
        ...(this.queryParams?.filter || {}),
        ...event.filter.reduce((a, v) => ({ ...a, [v.key]: v.value }), {}),
      },
    });
  }

  onReload() {
    this.updateQueryParams({
      sorts: [],
      filter: {},
    });
  }

  openSettingColumn() {
    this.store.setShowSettingColumn(true);
  }

  onDownload(records: readonly RecordType[]) {
    this.store.downLoad(records);
  }

  private mapCellTemplates(): void {
    const cellTemplates = [
      ...(this.defaultCells || []),
      ...(this.customCells || []),
    ];

    this.cellTemplates = cellTemplates.reduce(
      (acc, item) => ({ ...acc, [item.type || '']: item.template }),
      {},
    );

    this.cdr.markForCheck();
  }

  private mapFilterTemplates(): void {
    const filterTemplates = [
      ...(this.defaultFilters || []),
      ...(this.customFilters || []),
    ];

    this.filterTemplates = filterTemplates.reduce(
      (acc, item) => ({ ...acc, [item.type || '']: item.template }),
      {},
    );

    this.cdr.markForCheck();
  }

  private updateCheckedSet(id: IdType, checked: boolean): void {
    if (checked && !this.disableCheckSet.has(id)) {
      this._checkedKeys.add(id);
    } else {
      this._checkedKeys.delete(id);
    }
  }

  private updateCheckedData(record: RecordType, checked: boolean): void {
    if (checked && !this.disableCheckSet.has(record[this.idField])) {
      this._checkedData.set(record[this.idField], record);
    } else {
      this._checkedData.delete(record[this.idField]);
    }
  }

  private refreshCheckedStatus(): void {
    this.ngZone.run(() => {
      this.allRecordsChecked =
        this._checkedKeys.size > 0 &&
        this.records.every(record =>
          this._checkedKeys.has(record[this.idField]),
        );

      this.indeterminate =
        this._checkedKeys.size > 0 &&
        this.records.some(record =>
          this._checkedKeys.has(record[this.idField]),
        ) &&
        !this.allRecordsChecked;
      this.cdr.detectChanges();
    });
  }

  private onFilterTriggered(change: FieldValueChangeModel<any>): void {
    const header = this.store.findHeader(
      header => header.field === change.field,
    );

    if (header) {
      header.field && this.applyFilter(header.field, change.value);
      this.toggleFilter(false, header.field);
    }
  }

  private applyFilter(field?: keyof RecordType, value?: any): void {
    const filterDict: FilterParamModel<RecordType> =
      this.queryParams?.filter || {};
    const sorts = [...(this.queryParams?.sorts || [])];

    if (value && field) {
      this.updateQueryParams({
        sorts,
        filter: { ...filterDict, [field]: value },
      });
      this.store.setFilteringItem(undefined);
    } else {
      this.filteringItem$.pipe(take(1)).subscribe(item => {
        if (!!item && field === item.field) {
          this.updateQueryParams({
            sorts,
            filter: { ...filterDict, [field]: item.value },
          });
          this.store.setFilteringItem(undefined);
        }
      });
    }
  }

  private updateQueryParams(params: QueryParamsChangedModel<RecordType>) {
    this.queryParams = params;
    this.queryParamsChanged.next(params);
  }
}
