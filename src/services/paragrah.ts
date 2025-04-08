import { request } from '@/utils/request';
import { IPagination } from './base';
import { Paragraph } from './api/model';

export const toArticleIdGetParagragh = async (
  articleId: string
): Promise<Paragraph[]> => {
  const result = await request({
    method: 'get',
    url: `/paragraphs/all/${articleId}`,
  });
  return result;
};
