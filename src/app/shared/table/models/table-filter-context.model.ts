import { FilterValueChangeCallBack } from './filter-value-change-callback';
import { TableHeader } from './table-header.model';

export interface TableFilterContext<RecordType, ValueType> {
  $implicit: TableHeader<RecordType>;
  filterType: string;
  field: string;
  header: TableHeader<RecordType>;
  options: {
    label: string;
    value: any;
  }[];
  onValueChange: FilterValueChangeCallBack<ValueType>;
}
