export default {
  '/ide': {
    target: 'http://192.168.3.165:3010',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/ide/, '')
  },
  '/api': {
    target: 'https://sso-sit.newpearl.com',
    changeOrigin: true
  }
};
