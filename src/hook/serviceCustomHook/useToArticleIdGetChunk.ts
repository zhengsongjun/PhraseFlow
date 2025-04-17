import { Chunk, Paragraph } from '@/services/api/model';
import { toArticlIdGetContent } from '@/services/article';
import { toParaGraphIdGetChunkList } from '@/services/chunk';
import { toArticleIdGetParagragh } from '@/services/paragrah';
import { useEffect, useState } from 'react';

export interface ParagraphContainer extends Paragraph {
  chunks?: Chunk[];
}

const useToArticleIdGetChunk = (articleId: string, type?: string[]) => {
  const [paragraphList, setParagraphList] = useState<ParagraphContainer[]>([]);

  const formatterChunks = (
    paragraphList: ParagraphContainer[],
    type?: string[]
  ) => {
    if (!type || type.length === 0) {
      setParagraphList(paragraphList);
      return;
    }
    paragraphList.forEach((item) => {
      const newChunks = (item.chunks || []).filter((step) =>
        type.includes(step.chunkType)
      );
      item.chunks = newChunks;
    });
    setParagraphList([...paragraphList]);
  };

  const getAllChunkList = async (id: string) => {
    const paragraphs = await toArticlIdGetContent(id);
    const sortParagraphs = paragraphs.sort((a, b) => {
      return a.sort - b.sort;
    });

    sortParagraphs.forEach((item) => {
      const newChunks = item.chunks.sort((a, b) => {
        return a.sort - b.sort;
      });
      item.chunks = newChunks;
    });

    formatterChunks(sortParagraphs, type);
  };
  // 通过段落获取所有的chunk
  useEffect(() => {
    getAllChunkList(articleId);
  }, []);
  return {
    paragraphList: paragraphList,
  };
};

export default useToArticleIdGetChunk;
