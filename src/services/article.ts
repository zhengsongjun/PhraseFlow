import { request } from '@/utils/request';
import { Article } from './api/model';
import { IPagination } from './base';

export const getArticleList = async (): Promise<IPagination<Article>> => {
  const result = await request({
    method: 'get',
    url: '/articles',
  });
  return result;
};
