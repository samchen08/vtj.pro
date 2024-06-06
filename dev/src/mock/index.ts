import Mock from 'mockjs';
import { url } from '@vtj/utils';
Mock.setup({
  // timeout: '50-500'
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

Mock.mock(/\/mock-api\/list/, (req: any) => {
  const query = url.parse(req.body || '');
  const { currentPage = 1, pageSize = 10, total = 0 } = query;
  console.log('request', req);
  return Mock.mock({
    code: 0,
    success: true,
    data: {
      [`list|${pageSize}`]: [
        {
          id: '@id',
          name: '@cname',
          avatar: '@image',
          'sex|1': [1, 0],
          age: '@integer(1,100)',
          year: '@datetime(yyyy)',
          month: '@datetime(MM)',
          date: '@datetime(dd)',
          province: '@province',
          city: '@city',
          county: '@county',
          salary: '@float(100,9999,2,4)',
          intro: '@cparagraph(1,3)',
          join: '@datetime(yyyy-MM-dd)',
          create: '@datetime(yyyy-MM-dd hh:mm:ss)'
        }
      ],
      currentPage: parseInt(currentPage),
      pageSize: parseInt(pageSize),
      total: parseInt(total)
    }
  });
});
