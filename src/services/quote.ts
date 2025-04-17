import { request } from '@/utils/request';

export const getRandomQuote = async () => {
  const result = await request({
    url: '/quotes/random',
  });
  return result;
};
