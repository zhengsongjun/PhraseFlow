import { request } from '@/utils/request';

export const getCurrentDayActiveTime = async (): Promise<{ data: number }> => {
  const result = await request({
    method: 'get',
    url: `/active-log/day`,
  });
  return result;
};

export const getCurrentMonthActiveTime = async (): Promise<{
  data: Record<string, number>;
}> => {
  const result = await request({
    method: 'get',
    url: `/active-log/month-map`,
  });
  return result;
};

export const getCurrentWeekActiveTimeMap = async (): Promise<{
  data: Record<string, number>;
}> => {
  const result = await request({
    method: 'get',
    url: `/active-log/week`,
  });
  return result;
};
