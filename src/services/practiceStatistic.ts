import { request } from '@/utils/request';

export const updatePracticeStatistic = async (
  articleId: string,
  type: 'smart' | 'parctice'
): Promise<string> => {
  const result = await request({
    url: '/statistic',
    method: 'put',
    data: {
      articleId,
      type,
    },
  });
  return result;
};

export const findPracticeStatistic = async (
  articleId: string
): Promise<number> => {
  const result = await request({
    url: `/statistic`,
    params: {
      articleId,
    },
  });
  return result;
};
