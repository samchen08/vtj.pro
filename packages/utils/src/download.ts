export function downloadUrl(url: string, filename: string = '') {
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  link.target = '_blank';
  link.click();
}

export function downloadBlob(data: any, filename: string = '', type?: string) {
  const blob = new Blob([data], { type });
  const link = document.createElement('a');
  link.download = filename;
  link.style.display = 'none';
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}

export async function downloadRemoteFile(
  url: string,
  filename: string = '',
  type?: string
) {
  return fetch(url, { credentials: 'include' }).then(async (res) => {
    const data = await res.blob();
    downloadBlob(data, filename, type);
    return data;
  });
}

export function downloadJson(data: any, filename: string = '') {
  const jsonString = JSON.stringify(data);
  downloadBlob(jsonString, filename, 'application/json');
}

