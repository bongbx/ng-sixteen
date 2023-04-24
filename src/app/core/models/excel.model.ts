export interface ExcelModel {
  Sheets: Sheet[];
}

export interface Sheet {
  Name?: string;
  Index: number;
  Rows: Row[];
  Total?: number;
  TotalSuccess?: number;
  IsSuccess?: boolean;
}

interface Row {
  Index: number;
  Cells: Cell[];
  IsHeader: boolean;
  IsSuccess?: boolean;
  IsWarning?: boolean;
  IsNewData?: boolean;
}

interface Cell {
  Index: number;
  Value: string;
  Status?: 'Ok' | 'Error' | 'Warning';
}
