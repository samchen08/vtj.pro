import axios from 'axios';
const modules = [
  'create-vtj',
  '@vtj/cli',
  '@vtj/utils',
  '@vtj/icons',
  '@vtj/ui',
  '@vtj/charts',
  '@vtj/designer',
  '@vtj/matrials',
  '@vtj/renderer',
  '@vtj/local',
  '@vtj/coder',
  '@vtj/node',
  '@vtj/base',
  '@vtj/core',
  '@vtj/web',
  '@vtj/pro',
  '@vtj/mobile'
];

const maxTimes = 60;
let counter = 0;

async function sendSync(name) {
  const res = await axios
    .put(
      `https://registry-direct.npmmirror.com/${name}/sync?sync_upstream=true`
    )
    .catch((e) => {
      console.log('error', e.message);
      return {};
    });
  if (res.data) {
    const logId = res.data.logId;
    counter = 0;
    await checkDone(name, logId);
    console.log('sendSync:', name, 'done!');
  }
}

async function checkDone(name, logId) {
  const res = await axios
    .get(`https://registry-direct.npmmirror.com/${name}/sync/log/${logId}`)
    .catch((e) => {
      console.log('error:', e.message);
      return {};
    });
  let syncDone = !!res.data?.syncDone;
  return new Promise((resolve) => {
    if (!syncDone) {
      ++counter;
      if (counter > maxTimes) {
        console.log('error:', `${logId} checkDone timeout`);
        resolve(true);
        return;
      }
      setTimeout(async () => {
        syncDone = await checkDone(name, logId);
        if (syncDone) {
          resolve(true);
        }
      }, 1000);
    } else {
      resolve(true);
    }
  });
}

for (let mod of modules) {
  await sendSync(mod);
}
