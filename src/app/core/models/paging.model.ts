import { SortParamModel } from "src/app/shared";

/**
 * This is paging response that returned from BE
 */
export interface PagedModel<T> {
  Data: T[];
  Total: number;
}

/**
 *  Used to store a paged data in store
 */
export interface PagingDataStore<Model, FilterModel> {
  records: Model[];
  totalSize: number;
  page: number;
  pageSize: number;
  areRecordsLoading: boolean;
  areRecordsLoadingError: string | null;

  filters: FilterModel;
  sorts: SortParamModel<Model>[];
}
