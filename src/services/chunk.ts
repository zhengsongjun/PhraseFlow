import { request } from '@/utils/request';
import { Chunk } from './api/model';

export const toParaGraphIdGetChunkList = async (
  paraGraphId: string
): Promise<Chunk[]> => {
  const result = await request({
    url: `/chunks/${paraGraphId}`,
    method: 'get',
  });
  return result;
};
