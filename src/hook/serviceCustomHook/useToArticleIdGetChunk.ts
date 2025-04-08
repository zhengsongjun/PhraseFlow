import { Chunk, Paragraph } from '@/services/api/model';
import { toParaGraphIdGetChunkList } from '@/services/chunk';
import { toArticleIdGetParagragh } from '@/services/paragrah';
import { useEffect, useState } from 'react';

interface ParagraphContainer extends Paragraph {
  chunks?: Chunk[];
}

const useToArticleIdGetChunk = (articleId: string) => {
  const [paragraphList, setParagraphList] = useState<ParagraphContainer[]>([]);
  // 首先获取所有的段落
  const getAllChunkList = async () => {
    if (!articleId) return;
    const paragraphList = await toArticleIdGetParagragh(articleId);
    const sortList: ParagraphContainer[] = paragraphList.sort(
      (a, b) => a.sort - b.sort
    );
    try {
      await Promise.all(
        sortList.map(async (item, index) => {
          const result = await toParaGraphIdGetChunkList(item.id);
          sortList[index].chunks = result.sort((a, b) => {
            return a.sort - b.sort;
          });
          return result;
        })
      );
      setParagraphList(sortList);
    } catch (e) {
      console.log(e);
    }
  };
  // 通过段落获取所有的chunk
  useEffect(() => {
    getAllChunkList();
  }, []);
  return {
    paragraphList: paragraphList,
  };
};

export default useToArticleIdGetChunk;
