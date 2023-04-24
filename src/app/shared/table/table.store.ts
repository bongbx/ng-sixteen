import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { TranslateService } from '@ngx-translate/core';
import { isValid, parseISO } from 'date-fns';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import {
  FieldValueChangeModel,
  TableHeader,
  TableHeaderConfiguration,
} from './models';
import { getCountryCode, getFormatDateByCountryCode, hashCode } from 'src/app/core';

export interface TableState<RecordType extends Record<string, any>> {
  filteringItem?: FieldValueChangeModel<any>;
  isShowSettingColumn: boolean;

  id: string;
  headers: TableHeader<RecordType>[];
  headersDefault: TableHeader<RecordType>[];
}

const initialState: TableState<any> = {
  filteringItem: undefined,
  isShowSettingColumn: false,
  id: '',
  headers: [],
  headersDefault: [],
};

@Injectable()
export class TableStore<
  RecordType extends Record<string, any>,
> extends ComponentStore<TableState<RecordType>> {
  /*
   * Latest filter item emitted from table filters.
   */
  readonly filteringItem$ = this.select(state => state.filteringItem, {
    debounce: true,
  });

  readonly isShowSettingColumn$ = this.select(
    state => state.isShowSettingColumn,
    { debounce: true },
  );

  readonly headers$ = this.select(state => state.headers, {
    debounce: true,
  });

  /*
   * ResetFilterItem is not part of the TableState since it is used to fire
   * an event from one component to others. Having initial and current state
   * does not make any sense.
   */
  readonly resetFilterItem$: Observable<FieldValueChangeModel<any> | null>;

  /*
   * FilterTrigger is not part of the TableState since it is used to fire
   * an event from one component to others. Having initial and current state
   * does not make any sense.
   */
  readonly filterTrigger$: Observable<FieldValueChangeModel<any> | undefined>;

  private readonly resetFilterItemSubject = new Subject<
    FieldValueChangeModel<any>
  >();
  private readonly filterTriggerSubject = new Subject<
    FieldValueChangeModel<any> | undefined
  >();

  constructor(private readonly translateService: TranslateService) {
    super(initialState);
    this.resetFilterItem$ = this.resetFilterItemSubject.asObservable();
    this.filterTrigger$ = this.filterTriggerSubject.asObservable();
  }

  readonly getHeaders = () => this.get(s => s.headers);

  readonly setFilteringItem = this.updater(
    (
      state,
      item: FieldValueChangeModel<any> | undefined,
    ): TableState<RecordType> => ({
      ...state,
      filteringItem: item,
    }),
  );

  readonly setShowSettingColumn = this.updater<boolean>(
    (state, IsShowSettingColumn): TableState<RecordType> => ({
      ...state,
      isShowSettingColumn: IsShowSettingColumn,
    }),
  );

  readonly getHeader = (index: number) =>
    this.get(state => state.headers)[index];

  readonly findHeader = (
    predicate: (
      value: TableHeader<RecordType>,
      index: number,
      obj: TableHeader<RecordType>[],
    ) => unknown,
    thisArg?: any,
  ) => this.get(state => state.headers).find(predicate);

  readonly findHeaderIndex = (
    predicate: (
      value: TableHeader<RecordType>,
      index: number,
      obj: TableHeader<RecordType>[],
    ) => unknown,
    thisArg?: any,
  ) => this.get(state => state.headers).findIndex(predicate);

  readonly setHeaders = this.updater<TableHeader<RecordType>[]>(
    (state, data): TableState<RecordType> => {
      const Id = `app-table-${hashCode(
        data.map(x => x.label + ((x.field as string) || '')).join(''),
      )}`;
      const headersDefault = this.get(s => s.headersDefault);
      if (!headersDefault.length) {
        this.patchState({ headersDefault: data });
      }

      // const dataHeaders = localStorage.getItem(Id);
      // if (dataHeaders) {
      //   const headersStorage = JSON.parse(
      //     dataHeaders,
      //   ) as TableHeaderConfiguration<RecordType>[];
      //   if (headersStorage) {
      //     const headers = data
      //       .map(x => ({
      //         ...x,
      //         ...headersStorage.find(s => s.field === x.field),
      //         order: headersStorage.findIndex(s => s.field === x.field),
      //       }))
      //       .sort((a, b) => a.order - b.order);
      //     return { ...state, headers: headers, id: Id };
      //   }
      // } else {
      //   const headerConfigs: TableHeaderConfiguration<RecordType>[] = data.map(
      //     ({ label, width, isHidden, field }) => ({
      //       label,
      //       width,
      //       isHidden,
      //       field,
      //     }),
      //   );
      //   localStorage.setItem(Id, JSON.stringify(headerConfigs));
      // }
      return { ...state, headers: data, id: Id };
    },
  );

  readonly updateHeader = this.effect<[string, number | undefined]>(params$ =>
    params$.pipe(
      tap(([col, colWidth]) => {
        const headers = this.get(({ headers: Headers }) => Headers).map(
          ({ label, ...header }) =>
            label === col
              ? { ...header, label, width: `${colWidth}px` }
              : { ...header, label },
        );

        const headerConfigs = headers.map(
          ({ label, width, isHidden, field }) => ({
            label,
            width,
            isHidden,
            field,
          }),
        );

        // localStorage.setItem(
        //   this.get(({ id: Id }) => Id),
        //   JSON.stringify(headerConfigs),
        // );
        this.patchState({ headers: headers });
      }),
    ),
  );

  readonly saveHeaderConfiguration = this.effect<
    TableHeaderConfiguration<RecordType>[]
  >(params$ =>
    params$.pipe(
      tap(headerConfig => {
        // localStorage.setItem(
        //   this.get(s => s.id),
        //   JSON.stringify(headerConfig),
        // );
        const headers = this.get(s => s.headers)
          .map(x => ({
            ...x,
            ...headerConfig.find(e => e.field === x.field),
            order: headerConfig.findIndex(e => e.field === x.field),
          }))
          .sort((a, b) => a.order - b.order);
        this.patchState({ isShowSettingColumn: false, headers: headers });
      }),
    ),
  );

  readonly reLoadHeader = this.effect(param$ =>
    param$.pipe(
      tap(() => {
        this.patchState(({ headers: Headers, ...state }) => ({
          state,
          headers: Headers.map(({ sortOrder, ...x }) => ({
            ...x,
          })),
        }));
      }),
    ),
  );

  readonly resetColumSettings = this.effect(params$ =>
    params$.pipe(
      tap(() => {
        // localStorage.removeItem(this.get(s => s.id));
        this.setHeaders(this.get(x => x.headersDefault));
        this.patchState({ isShowSettingColumn: false });
      }),
    ),
  );

  readonly downLoad = this.effect<readonly RecordType[]>(params$ =>
    params$.pipe(
      tap(data => {
        const headers = this.get(({ headers: Headers }) => Headers).filter(
          ({ isHidden }) => !!!isHidden,
        );
        const fields = headers
          .filter(({ field, label }) => Boolean(field) && Boolean(label))
          .map(({ field }) => field!);

        const newData: RecordType[] = data.map(x => {
          const temp: any = {};
          fields.forEach(h => (temp[h] = x[h]));
          return temp;
        });

        const exportData = newData.map(x => {
          const array = Object.entries(x).filter(([key]) =>
            fields.includes(key as any),
          );

          const obj = array.reduce((o, [key, value]) => {
            const header = headers.find(x => x.field === key);
            const translateKey = this.translateService.instant(
              header?.label || '',
            );
            return Object.assign(o, { [translateKey]: value });
          }, {});

          return obj;
        });

        this.downloadExcel(exportData);
      }),
    ),
  );

  public resetFilterItem(item: FieldValueChangeModel<any | null>) {
    this.resetFilterItemSubject.next(item);
  }

  public triggerFilter(change?: FieldValueChangeModel<any>) {
    this.filterTriggerSubject.next(change);
  }

  private downloadExcel = (
    data: { [key: string]: any }[],
    fileName: string = 'data.xlsx',
  ) => {
    data.forEach(x => {
      Object.entries(x)
        .filter(([, value]) => this.isISODate(value))
        .forEach(([key, value]) => {
          x[key] = new Date(value);
        });
    });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet([...data], {
      dateNF: getFormatDateByCountryCode(getCountryCode()),
      cellDates: true,
    });
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };

    XLSX.writeFile(workbook, fileName);
  };

  private isISODate(date: any): boolean {
    const parsedDate = parseISO(date);
    const isValidDate = isValid(parsedDate);
    return isValidDate;
  }
}
