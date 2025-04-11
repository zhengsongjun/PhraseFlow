import useToArticleIdGetChunk from '@/hook/serviceCustomHook/useToArticleIdGetChunk';
import { useParams } from 'react-router-dom';
import CardSet from './CardSet/CardSet';
import SentencePractice from '../../components/SentencePractice/SentencePractice';
import { useEffect, useState } from 'react';
import { usePracticeTracker } from '@/hook/serviceCustomHook/usePracticeTracker';
import TimeTracker from './TimeTracker/TimeTracker';
import FireworksContainer from '@/components/FireworksContainer/FireworksContainer';
import CongratsModal from '@/components/CongratsModal/CongratsModal';
import { updatePracticeStatistic } from '@/services/practiceStatistic';

const Game = () => {
  const { id } = useParams<{ id: string }>();
  const { activeTime } = usePracticeTracker({ page: 'particle' });
  const { paragraphList } = useToArticleIdGetChunk(id as string);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [currentChunks, setCurrentChunks] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const currentChunk =
    paragraphList?.[currentParagraph]?.chunks?.[currentChunks];
  const sentence = currentChunk?.text || '';
  const translation = currentChunk?.definition || '';
  const [processList, setProcessList] = useState<number[]>([]);

  useEffect(() => {
    const newProcessList = paragraphList.map((_, index) => {
      return index === 0 ? 1 : 0;
    });
    setProcessList(newProcessList);
  }, [paragraphList]);

  useEffect(() => {
    if (!paragraphList.length) return;

    setProcessList((prev) => {
      const updated = [...prev];
      updated[currentParagraph] = currentChunks + 1;
      return updated;
    });
  }, [currentChunks, currentParagraph]);

  return (
    <>
      <TimeTracker style={{ margin: 20 }} activeTime={activeTime} />
      <CardSet
        data={paragraphList.map((item, index) => {
          return {
            ...item,
            total: paragraphList[index]?.chunks?.length || 0,
            process: processList[index],
          };
        })}
        current={currentParagraph}
        onCardItemClick={(index) => {
          setCurrentParagraph(index);
          setCurrentChunks(0);
        }}
      />
      <SentencePractice
        onPerv={() => {
          setCurrentChunks(currentChunks - 1);
        }}
        speechRate={0.8}
        phonetic={currentChunk?.phonetic || ''}
        sentence={sentence}
        translation={translation}
        onPassValidate={async () => {
          if (
            currentChunks ===
            (paragraphList?.[currentParagraph]?.chunks?.length || 0) - 1
          ) {
            if (currentParagraph === paragraphList.length - 1) {
              setShowFireworks(true);
              await updatePracticeStatistic(id as string, 'parctice');
            } else {
              setCurrentParagraph(currentParagraph + 1);
              setCurrentChunks(0);
            }
          } else {
            setCurrentChunks(currentChunks + 1);
          }
        }}
        onNext={() => {
          if (
            currentChunks ===
            (paragraphList?.[currentParagraph]?.chunks?.length || 0) - 1
          ) {
            if (currentParagraph === paragraphList.length - 1) {
              return;
            } else {
              setCurrentParagraph(currentParagraph + 1);
              setCurrentChunks(0);
            }
          } else {
            setCurrentChunks(currentChunks + 1);
          }
        }}
        disabeldPerv={currentChunks === 0}
      />
      {showFireworks ? <FireworksContainer /> : <></>}
      <CongratsModal
        visible={showFireworks}
        onAgainButtonClick={() => {
          setShowFireworks(false);
          setCurrentChunks(0);
          setCurrentParagraph(0);
        }}
      />
    </>
  );
};

export default Game;
