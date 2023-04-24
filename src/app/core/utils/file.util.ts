export const download = (blob: Blob, name?: string) => {
  const a = document.createElement('a');
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = name || 'output.xlsx';
  a.click();
  URL.revokeObjectURL(url);
};
