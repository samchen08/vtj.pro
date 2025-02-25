export default {
  '/api': {
    target: 'https://sso-sit.newpearl.com',
    changeOrigin: true
  },
  '/__vtj__': {
    target: 'http://localhost:9527',
    changeOrigin: true
  },
  '/@vtj': {
    target: 'http://localhost:9527',
    changeOrigin: true
  }
};
