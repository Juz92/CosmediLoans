import { getSheetsClient } from "./auth.js";

export async function readRange(
  sheetId: string,
  tabName: string,
  range: string
): Promise<string[][]> {
  const sheets = await getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${tabName}!${range}`,
  });
  return (response.data.values as string[][]) ?? [];
}

export async function readLastNRows(
  sheetId: string,
  tabName: string,
  range: string,
  n: number
): Promise<string[][]> {
  const allRows = await readRange(sheetId, tabName, range);
  const dataRows = allRows.slice(1);
  return dataRows.slice(-n);
}
