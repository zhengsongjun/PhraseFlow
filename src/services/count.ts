import { request } from '@/utils/request';

export const getCurrentDayActiveTime = async () => {
  const result = await request({
    method: 'get',
    url: `/active-log/day`,
  });
  return result;
};

export const getCurrentMonthActiveTime = async () => {
  const result = await request({
    method: 'get',
    url: `/active-log/month-map`,
  });
  return result;
};

export const getCurrentWeekActiveTimeMap = async () => {
  const result = await request({
    method: 'get',
    url: `/active-log/week`,
  });
  return result;
};
