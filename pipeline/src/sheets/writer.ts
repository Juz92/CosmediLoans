import { getSheetsClient } from "./auth.js";

export async function appendRows(
  sheetId: string,
  tabName: string,
  rows: string[][]
): Promise<{ updatedRows: number }> {
  const sheets = await getSheetsClient();
  const response = await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${tabName}!A1`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: rows },
  });
  return { updatedRows: response.data.updates?.updatedRows ?? 0 };
}

export async function clearAndWrite(
  sheetId: string,
  tabName: string,
  headers: string[],
  rows: string[][]
): Promise<{ updatedRows: number }> {
  const sheets = await getSheetsClient();
  await sheets.spreadsheets.values.clear({
    spreadsheetId: sheetId,
    range: `${tabName}!A:Z`,
  });
  const allRows = [headers, ...rows];
  const response = await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: `${tabName}!A1`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: allRows },
  });
  return { updatedRows: response.data.updatedRows ?? 0 };
}
