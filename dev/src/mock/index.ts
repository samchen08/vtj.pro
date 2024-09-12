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
  const res = Mock.mock({
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
  console.log(res.data);
  res.data.list = [
    {
      id: '510000200511178510',
      name: '崔刚',
      avatar: 'http://dummyimage.com/240x400',
      sex: 1,
      age: 74,
      year: '1987',
      month: '11',
      date: '24',
      province: '山西省',
      city: '西双版纳傣族自治州',
      county: '其它区',
      salary: 7584.9113,
      intro: '过十劳管派强图委无飞光几儿提关决里。',
      join: '1989-08-31',
      create: '1996-08-09 08:55:30'
    },
    {
      id: '620000199208222275',
      name: '刘艳',
      avatar: 'http://dummyimage.com/234x60',
      sex: 1,
      age: 44,
      year: '2004',
      month: '10',
      date: '12',
      province: '河北省',
      city: '宜昌市',
      county: '龙江县',
      salary: 4995.046,
      intro:
        '什心现公住省身业表听证合义相律管石论。例人压据育式料务资名任走史具的即。',
      join: '1991-12-15',
      create: '1982-04-28 01:29:25'
    },
    ...res.data.list
  ];
  // res.data.total = 1;

  return res;
});
