import { request } from '@/utils/request';

export const getSmartArticleList = async () => {
  const result = await request({
    method: 'get',
    url: '/smart-article',
  });
  return {
    ...result,
  };
};

export const createSmartArticle = async (data: any) => {
  const result = await request({
    method: 'post',
    url: '/smart-article',
    data: data,
  });
  return {
    ...result,
  };
};
