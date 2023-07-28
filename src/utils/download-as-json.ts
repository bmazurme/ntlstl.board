function downloadAsJson(content: unknown, fileName: string, contentType: string) {
  const a = document.createElement('a');
  const txt = JSON.stringify(content);
  const file = new Blob([txt as BlobPart], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

export { downloadAsJson };
