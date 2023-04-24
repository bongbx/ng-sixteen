import { startOfDay } from 'date-fns';
import {
  compareTwoItem,
  Filter,
  PagingDataStore,
  Sort,
} from '..';
import { convertToSearchValue } from './search.util';
import { QueryCondition } from '../enums';
import { FilterParamModel, SortParamModel } from 'src/app/shared';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '../common';

export const convertToFilterQuery = <RecordType extends Record<string, any>>(
  filterModel: FilterParamModel<RecordType> | undefined,
): Filter[] => {
  const filters = Object.entries(filterModel ?? {}).map(([key, value]) => {
    switch (value?.constructor.name) {
      case 'Array':
        return {
          k: key,
          c: QueryCondition.In,
          v: value.join(','),
        };
      case 'Number':
        return {
          k: key,
          c: QueryCondition.Equal,
          v: value,
        };
      case 'Boolean':
        return {
          k: key,
          c: QueryCondition.Equal,
          v: value,
        };
      case 'Date':
        return {
          k: key,
          c: QueryCondition.On,
          v: (value as Date).toISOString(),
        };
      case 'String':
        return {
          k: key,
          c: QueryCondition.Contains,
          v: convertToSearchValue(value),
        };
      case 'Object':
        if ('hours' in value && 'minutes' in value) {
          return {
            k: key,
            c: QueryCondition.Equal,
            v: `${value.hours}:${value.minutes}`,
          };
        } else {
          return {
            k: key,
            c: QueryCondition.Contains,
            v: value,
          };
        }
      default:
        return {
          k: key,
          c: QueryCondition.Contains,
          v: value,
        };
    }
  });

  return filters;
};

export const convertToSortQuery = <RecordType extends Record<string, any>>(
  sortParams: SortParamModel<RecordType>[] | undefined,
) => sortParams?.map(x => ({ k: x.key, d: x.value })) ?? [];

// TODO: specific type for filter prop
export const initializePagingData = <Model>(): PagingDataStore<Model, any> => {
  return {
    records: [] as Model[],
    totalSize: 0,
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    areRecordsLoading: false,
    areRecordsLoadingError: null,

    filters: {},
    sorts: [],
  };
};

export function filterLocalData<T>(tableData: T[], Filters: Filter[]): T[] {
  const filterData = tableData.filter((item: any) => {
    let isPassCondition = true;
    for (let filter of Filters) {
      switch (filter.c) {
        case QueryCondition.Equal:
          if (item[filter.k] != filter.v) isPassCondition = false;
          break;
        case QueryCondition.GreaterThan:
          if (item[filter.k] <= filter.v) isPassCondition = false;
          break;
        case QueryCondition.GreaterThanOrEqual:
          if (item[filter.k] < filter.v) isPassCondition = false;
          break;
        case QueryCondition.LessThan:
          if (item[filter.k] >= filter.v) isPassCondition = false;
          break;
        case QueryCondition.LessThanOrEqual:
          if (item[filter.k] > filter.v) isPassCondition = false;
          break;
        case QueryCondition.NotEqual:
          if (item[filter.k] === filter.v) isPassCondition = false;
          break;
        case QueryCondition.Contains:
          if (
            !item[filter.k]
              .toString()
              .toLowerCase()
              .includes(filter.v.toString().toLowerCase())
          )
            isPassCondition = false;
          break;
        case QueryCondition.EndsWith:
          if (
            !item[filter.k]
              .toString()
              .toLowerCase()
              .endWith(filter.v.toString().toLowerCase())
          )
            isPassCondition = false;
          break;
        case QueryCondition.StartsWith:
          if (
            !item[filter.k]
              .toString()
              .toLowerCase()
              .startWith(filter.v.toString().toLowerCase())
          )
            isPassCondition = false;
          break;
        case QueryCondition.In:
          if (
            filter.v.toString().length &&
            !filter.v
              .toString()
              .toLowerCase()
              .split(',')
              .includes(item[filter.k].toString().toLowerCase())
          )
            isPassCondition = false;
          break;
        case QueryCondition.On:
          if (!(item[filter.k].getDate() === new Date(filter.v).getDate()))
            isPassCondition = false;
          break;
        default:
          break;
      }
    }
    return isPassCondition;
  });
  return filterData;
}

export function sortLocalData<T>(tableData: T[], Sorts: Sort[]): T[] {
  return tableData.sort((record1, record2) => {
    for (const sort of Sorts) {
      const compareResult = compareTwoItem(record1, record2, sort.k as string);
      if (compareResult !== 0) {
        return sort.d === 'asc' ? compareResult : -compareResult;
      }
    }
    return 0;
  });
}

export function paginateLocalData<T>(
  tableData: T[],
  pageIndex: number,
  pageSize: number,
): T[] {
  const result = tableData.reduce((resultArray: T[][], item, index) => {
    const chunkIndex = Math.floor(index / pageSize);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
  return result[pageIndex - 1] || [];
}

export function buildFilterExpression<T extends Record<string, any>>(
  filters: FilterParamModel<T>,
): (val: T) => boolean {
  const expressions = Object.entries(filters ?? {}).map(([key, value]) => {
    const isNullOrUndefined = (val: any) => val == null || val == undefined;
    switch (value?.constructor.name) {
      case 'Array':
        return (val: any) =>
          !value.length ||
          (!isNullOrUndefined(val[key]) && value.includes(val[key]));
      case 'Number':
        return (val: any) =>
          !isNullOrUndefined(val[key]) &&
          value.toFixed(3) === val[key].toFixed(3);
      case 'Boolean':
        return (val: any) => !isNullOrUndefined(val[key]) && value === val[key];
      case 'Date':
        return (val: any) =>
          !isNullOrUndefined(val[key]) &&
          startOfDay(value).getTime() ===
            startOfDay(new Date(val[key])).getTime();
      case 'String':
        return (val: any) =>
          !isNullOrUndefined(val[key]) &&
          val[key].toLowerCase().includes(value.toLowerCase());
      default:
        return (val: any) =>
          !isNullOrUndefined(val[key]) && val[key].includes(value);
    }
  });

  return (val: T) => expressions.every(e => e(val));
}
