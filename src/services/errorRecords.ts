import { request } from '@/utils/request';

export const createErrorRecord = async (articleId: string, chunkId: string) => {
  const result = await request({
    url: '/error-records',
    method: 'POST',
    data: {
      source: articleId,
      chunkId,
    },
  });
  return result;
};

export const getAllErrorRecord = async () => {
  const result = await request({
    url: '/error-records',
    method: 'GET',
  });
  return result;
};
