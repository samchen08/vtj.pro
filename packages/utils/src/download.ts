export function downloadUrl(url: string, filename: string = '') {
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  link.target = '_blank';
  link.click();
}

export function downloadBlob(data: any, filename: string = '') {
  const blob = new Blob([data]);
  const link = document.createElement('a');
  link.download = filename;
  link.style.display = 'none';
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}

export async function downloadRemoteFile(url: string, filename: string = '') {
  return fetch(url).then(async (res) => {
    const data = await res.blob();
    downloadBlob(data, filename);
    return data;
  });
}
