import Spreadsheet, { SheetData } from 'x-data-spreadsheet';
import { Sheet } from '..';
import * as XLSX from 'xlsx';

type AOA = any[][];

export const convertSheetDataToExcelModel = (
  sheetData: SheetData,
  index: number,
) => {
  const sheetExcel: Sheet = {
    Index: index,
    Name: sheetData.name,
    Rows: sheetData.rows
      ? Object.entries(sheetData.rows).map(([rKey, rValue]: [string, any]) => ({
          Index: Number(rKey),
          IsHeader: Number(rKey) === 0,
          Cells: Object.entries(rValue.cells).map(
            ([cKey, cValue]: [string, any]) => ({
              Index: Number(cKey),
              Value: cValue.text?.toString().trim(),
            }),
          ),
        }))
      : [],
  };
  return filterDataColumns(sheetExcel);
};

export const convertExcelModelToSheetData = (
  sheetExcel: Sheet,
  colDisabled: number[] = [],
) => {
  const sheetData: SheetData = {
    name: sheetExcel.Name,
    styles: [
      // Error styles
      {
        bgcolor: '#FF4D4F',
        font: {
          bold: true,
        },
      },
      {
        color: 'white',
        bgcolor: '#008000',
      },
      {
        bgcolor: '#FFA940',
      },
      {
        bgcolor: '#F4B184',
        font: {
          bold: true,
        },
      },
    ],
    rows: sheetExcel.Rows.reduce(
      (rowData, row, i) => ({
        ...rowData,
        [i]: {
          cells: row.Cells.reduce(
            (cellData, cell, j) => ({
              ...cellData,
              [j]: {
                text: cell.Value,
                editable: i === 0 ? false : !(colDisabled.some(s => s === j) && !row.IsNewData),
                style:
                  i === 0 && cell.Value
                    ? cell.Value.includes('*')
                      ? 3
                      : 1
                    : cell.Status === 'Error'
                    ? 0
                    : cell.Status === 'Warning'
                    ? 2
                    : undefined,
              },
            }),
            {},
          ),
        },
      }),
      {},
    ),
  };

  return scaleWidthColumn(sheetData);
};

export const convertExcelModelToSheetDescriptionData = (sheetExcel: Sheet) => {
  const sheetData: SheetData = {
    name: sheetExcel.Name,
    styles: [
      {
        color: 'white',
        bgcolor: '#008000',
      },
    ],
    rows: sheetExcel.Rows.reduce(
      (rowData, row, i) => ({
        ...rowData,
        [i]: {
          cells: row.Cells.reduce(
            (cellData, cell, j) => ({
              ...cellData,
              [j]: {
                text: cell.Value,
                editable: false,
                style: i === 0 ? 0 : undefined,
              },
            }),
            {},
          ),
        },
      }),
      {},
    ),
  };

  return scaleWidthColumn(sheetData);
};

export const scaleWidthColumn = (sheet: SheetData) => {
  if (!sheet.rows) {
    return sheet;
  }

  let colWidths: number[] = [];
  Object.entries(sheet.rows as any).map(([rKey, rValue]: [string, any]) => {
    Object.entries(rValue.cells).map(([cKey, cValue]: [string, any]) => {
      const len = (cValue.text ?? 0).length;
      if (colWidths.length > Number(cKey)) {
        if (len > colWidths[Number(cKey)]) {
          colWidths[Number(cKey)] = len;
        }
      } else {
        colWidths = [...colWidths, len];
      }
    });
  });

  let cols: any = {};
  colWidths.map((colWidth, i) => {
    cols[`${i}`] = {
      width: colWidth * 8 > 100 ? colWidth * 8 : 100,
    };
  });

  sheet.cols = cols;
  return sheet;
};

export const filterDataColumns = (sheet: Sheet) => {
  const numberOfColumns: number = sheet.Rows[0].Cells.length;
  sheet.Rows.map(
    r => (r.Cells = r.Cells.filter(c => c.Index < numberOfColumns)),
  );
  return sheet;
};

export const formatSheetData = (sheetData: SheetData) => {
  if (sheetData === undefined) return sheetData;

  const data = sheetData as any;
  delete data.rows.len;

  let numberOfColumns: number = 0;
  Object.entries(data.rows).map(([rKey, rValue]: [string, any]) => {
    if (rKey === '0') {
      numberOfColumns = Object.entries(rValue.cells).length;
    } else {
      const check = Object.entries(rValue.cells)
        .map(([cKey, cValue]: [string, any]) => {
          return (
            cValue['text'] === undefined ||
            cValue['text'] === '' ||
            cValue['text'] === null ||
            Number(cKey) === numberOfColumns
          );
        })
        .every(x => x);
      if (check) {
        delete data.rows[rKey];
      } else {
        [...Array(numberOfColumns).keys()].map(x => {
          if (!(`${x}` in rValue.cells) || !rValue.cells[`${x}`].text) {
            rValue.cells[`${x}`] = {
              text: '',
            };
          }
        });
      }
    }
  });
  return data as SheetData;
};

export const exportExcel = (lstSheetData: SheetData[], fileName: string) => {
  const wb: XLSX.WorkBook = XLSX.utils.book_new();

  Object.entries(lstSheetData as any[]).map(([sKey, sValue]) => {
    delete sValue.rows.len;
    let header: string[] = [];
    const rows: any[] = [];

    Object.entries(sValue.rows).map(([rKey, rValue]: [string, any]) => {
      const cells: any = {};
      Object.entries(rValue.cells).map(([cKey, cValue]: [string, any]) => {
        if (rKey == '0') {
          header = [...header, cValue.text];
        } else {
          cells[header[Number(cKey)]] = cValue.text;
        }
      });
      rKey == '0' ? [] : rows.push(cells);
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, sValue.name);
  });

  XLSX.writeFile(wb, fileName);
};

export const importExcel = (evt: any, spreadsheet: Spreadsheet | undefined) => {
  const oldSheets = (spreadsheet?.getData() as SheetData[]);
  const headerOfFirstSheet = Object.values(oldSheets[0].rows ?? {})[0];

  /* wire up file reader */
  const target: DataTransfer = <DataTransfer>evt.target;
  if (target.files.length !== 1) throw new Error('Cannot use multiple files');

  const name = target.files[0].name;
  const lastDot = name.lastIndexOf('.');
  const ext = name.substring(lastDot + 1);
  if (!['xls', 'xlsm', 'xlsx'].some(s => s === ext)) {
    return true;
  }

  const reader: FileReader = new FileReader();
  reader.onload = (e: any) => {
    /* read workbook */
    const ab: ArrayBuffer = e.target.result;
    const wb: XLSX.WorkBook = XLSX.read(ab);

    /* grab sheets */
    const sheets: SheetData[] = [];
    [wb.SheetNames[0]].map(wsName => {
      const ws: XLSX.WorkSheet = wb.Sheets[wsName];

      /* save data */
      const raw = <AOA>XLSX.utils.sheet_to_json(ws, { header: 1, raw: false });
      const rows: any = {};
      raw.map((row, i) => {
        const cells: any = {};
        row.map((cell, j) => {
          cells[`${j}`] = { text: cell };
        });
        rows[`${i}`] = i === 0 ? headerOfFirstSheet : { cells: cells };
      });
      sheets.push({ ...oldSheets[0], rows: rows });
    });
    spreadsheet?.loadData([sheets[0], ...oldSheets.slice(1)]);
  };
  reader.readAsArrayBuffer(target.files[0]);
  evt.target.value = null;
  return false;
};
