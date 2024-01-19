import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

export function dateFormat(
  date: string | number | Date,
  format: string = 'YYYY-MM-DD HH:mm:ss'
) {
  return dayjs(date as dayjs.ConfigType).format(format);
}

export { dayjs };
