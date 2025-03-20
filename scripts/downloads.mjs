import axios from 'axios';

async function getNpmmirrorData(year) {
  const host = 'https://registry.npmmirror.com/downloads/range';
  const range = `${year}-01-01:${year + 1}-01-01`;
  const url = `${host}/${range}/@vtj/core`;
  let total = 0;
  const res = await axios.get(url).then((r) => r.data?.downloads || []);
  for (const item of res) {
    total += item.downloads;
  }
  return total;
}

async function getNpmData(year) {
  const host = 'https://api.npmjs.org/downloads/point';
  const range = `${year}-01-01:${year + 1}-01-01`;
  const url = `${host}/${range}/@vtj/core`;
  return await axios.get(url).then((r) => r.data.downloads);
}

async function getDownloads() {
  const startYear = 2022;
  const currentYear = new Date().getFullYear();
  let downloads = 0;
  for (let i = startYear; i <= currentYear; i++) {
    downloads += await getNpmmirrorData(i);
    downloads += await getNpmData(i);
  }
  console.log('downloads: ' + downloads);
}

getDownloads();
