export default {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
    ws: true
  }
};
