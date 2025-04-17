import { request } from '@/utils/request';
import { Article } from './api/model';
import { IPagination } from './base';
import { ParagraphContainer } from '@/hook/serviceCustomHook/useToArticleIdGetChunk';

export const getArticleList = async (): Promise<IPagination<Article>> => {
  const result = await request({
    method: 'get',
    url: '/articles',
  });
  return result;
};

export const articleControllerCreate = async (data: {
  title: string;
  content: string;
}) => {
  const result = await request({
    method: 'post',
    url: '/articles',
    data: data,
  });
  return result;
};

export const toArticlIdGetContent = async (id: string) => {
  const result = await request({
    method: 'get',
    url: `/articles/content/${id}`,
  });
  return result;
};

export const updateArticleContent = async (id: string, data: any) => {
  const result = await request({
    method: 'post',
    url: `/paragraphs/aticle/paragraphs/${id}`,
    data,
  });
  return result;
};

export const deleteArtilceToId = async (id: string) => {
  const result = await request({
    method: 'delete',
    url: `/articles/${id}`,
  });
  return result;
};
