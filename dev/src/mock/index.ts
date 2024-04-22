import Mock from 'mockjs';

Mock.setup({
  timeout: '500-3000'
});

Mock.mock(/\/mock-api\/image/, () => {
  return Mock.mock({
    code: 0,
    data: '@image'
  });
});

Mock.mock(/\/mock-api\/upload/, {
  code: 0,
  data: '@image',
  success: true
});
