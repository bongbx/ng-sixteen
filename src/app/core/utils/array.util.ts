import { Sort } from "..";

export const uniqueArray = function <T>(arr: T[]): T[] {
  return [...new Set(arr)];
};

export const uniqueArrayByField = function (arr: any[], field: string) {
  let u: any = {},
    res = [];
  for (let item of arr) {
    if (!u.hasOwnProperty(item[field])) {
      res.push(item);
      u[item[field]] = 1;
    }
  }
  return res;
};

export const uniqueArrayByKey = function <T>(
  arr: T[],
  createKeyFunction: (x: T) => string | number,
) {
  let u: any = {},
    res = [];
  for (let item of arr) {
    let key = createKeyFunction(item);
    if (!u.hasOwnProperty(key)) {
      res.push(item);
      u[key] = 1;
    }
  }
  return res;
};

export const groupArrayByField = function <T>(arr: T[], field: string): T[][] {
  let groups: { [key: string]: T[] } = {};
  for (let item of arr) {
    let key = (item as any)[field].toString();
    groups[key] = groups[key] || [];
    groups[key].push(item);
  }
  return Object.values(groups);
};

export const groupArrayByFieldNoIndex = function <T>(arr: T[], field: string): T[][] {
  let groups: { [key: string]: T[] } = {};
  let result: T[][] = [];
  for (let item of arr) {
    let key = (item as any)[field].toString();
    if (!groups[key]) {
      groups[key] = [];
      result.push(groups[key]);
    }
    groups[key].push(item);
  }
  return result;
};

export const groupArrayByKey = function <T>(
  arr: T[],
  createKeyFunction: (x: T) => string | number,
): T[][] {
  let groups: { [key: string]: T[] } = {};
  for (let item of arr) {
    let key = createKeyFunction(item);
    groups[key] = groups[key] || [];
    groups[key].push(item);
  }
  return Object.values(groups);
};

export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);

export function range(fromValue: number, toValue: number, step = 1): number[] {
  if (toValue < fromValue) {
    return [];
  }

  const result = [];

  for (let i = fromValue; i <= toValue; i = i + step) {
    result.push(i);
  }

  return result;
}

export function sortArrayBySortObject<T>(arr: T[], sort: Sort): T[] {
  if (sort.d === 'asc') {
    if (typeof (arr[0] as any)[sort.k] === 'string') {
      arr = arr.sort((a: any, b: any) => a[sort.k].localeCompare(b[sort.k]));
    }
    if ((arr[0] as any)[sort.k] instanceof Date) {
      arr = arr.sort(
        (a: any, b: any) =>
          new Date(a[sort.k]).getDate() - new Date(b[sort.k]).getDate(),
      );
    } else {
      arr = arr.sort((a: any, b: any) => a[sort.k] - b[sort.k]);
    }
  }
  if (sort.d === 'desc') {
    if (typeof (arr[0] as any)[sort.k] === 'string') {
      arr = arr.sort((a: any, b: any) => b[sort.k].localeCompare(a[sort.k]));
    }
    if ((arr[0] as any)[sort.k] instanceof Date) {
      arr = arr.sort(
        (a: any, b: any) =>
          new Date(b[sort.k]).getDate() - new Date(a[sort.k]).getDate(),
      );
    } else {
      arr = arr.sort((a: any, b: any) => b[sort.k] - a[sort.k]);
    }
  }
  return arr;
}

export function compareTwoItem<T>(record1: T, record2: T, key: string): number {
  if (
    typeof (record1 as any)[key] === 'string' &&
    typeof (record2 as any)[key] === 'string'
  ) {
    return (record1 as any)[key].localeCompare((record2 as any)[key]);
  }
  if (
    (record1 as any)[key] instanceof Date &&
    (record2 as any)[key] instanceof Date
  ) {
    return new Date((record1 as any)[key]).getDate() >
      new Date((record2 as any)[key]).getDate()
      ? 1
      : new Date((record1 as any)[key]).getDate() <
        new Date((record2 as any)[key]).getDate()
      ? -1
      : 0;
  } else {
    return (record1 as any)[key] > (record2 as any)[key]
      ? 1
      : (record1 as any)[key] < (record2 as any)[key]
      ? -1
      : 0;
  }
}
