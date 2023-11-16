const baseURL = new URL(process.env.REACT_APP_BACKEND_BASE_URL);

baseURL.pathname = "/api/v1/visualize";
export const visualizeURL = baseURL.toString();

baseURL.pathname = "/api/v1/analyze";
export const analizeURL = baseURL.toString();

baseURL.pathname = "/api/v1/statistics";
export const statisticsURL = baseURL.toString();

baseURL.pathname = "/api/v1/upload";
export const fileUploadURL = baseURL.toString();

baseURL.pathname = "/api/v1/cleanData";
export const cleanDataURL = baseURL.toString();

baseURL.pathname = "/api/v1/files";
export const filesURL = baseURL.toString();

baseURL.pathname = "/api/v1/export/pdf";
export const exportPDF = baseURL.toString();

baseURL.pathname = "/api/v1/export/csv";
export const exportCSV = baseURL.toString();

baseURL.pathname = "/api/v1/getColumns";
export const columnsURL = baseURL.toString();

export function getDeleteFileURL(fileName) {
  baseURL.pathname = `/api/v1/delete/${fileName}`;
  return baseURL.toString();
}
