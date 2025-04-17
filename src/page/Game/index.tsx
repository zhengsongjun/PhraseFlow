import useToArticleIdGetChunk from '@/hook/serviceCustomHook/useToArticleIdGetChunk';
import { useParams } from 'react-router-dom';
import CardSet from './CardSet/CardSet';
import SentencePractice from '../../components/SentencePractice/SentencePractice';
import { useEffect, useRef, useState } from 'react';
import { usePracticeTracker } from '@/hook/serviceCustomHook/usePracticeTracker';
import TimeTracker from './TimeTracker/TimeTracker';
import FireworksContainer from '@/components/FireworksContainer/FireworksContainer';
import CongratsModal from '@/components/CongratsModal/CongratsModal';
import { updatePracticeStatistic } from '@/services/practiceStatistic';
import vMp3 from '@/assets/v.mp3';
const Game = () => {
  const { id, type: jsonType } = useParams<{ id: string; type: string }>();
  const { activeTime } = usePracticeTracker({ page: 'particle' });
  const type = JSON.parse(jsonType as string);
  const { paragraphList } = useToArticleIdGetChunk(id as string, type);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const currentChunk =
    paragraphList?.[currentParagraph]?.chunks?.[currentChunkIndex];
  const sentence = currentChunk?.text || '';
  const translation = currentChunk?.definition || '';
  const [processList, setProcessList] = useState<number[]>([]);
  const soundRef = useRef<Howl | null>(null);
  const playSuccessSound = () => {
    const sound = new Howl({
      src: [vMp3],
      volume: 1,
    });
    sound.play();
    soundRef.current = sound;
  };

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
      updated[currentParagraph] = currentChunkIndex + 1;
      return updated;
    });
  }, [currentChunkIndex, currentParagraph]);

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
          setCurrentChunkIndex(0);
        }}
      />
      <SentencePractice
        onPerv={() => {
          setCurrentChunkIndex(currentChunkIndex - 1);
        }}
        speechRate={1}
        phonetic={currentChunk?.phonetic || ''}
        sentence={sentence}
        translation={translation}
        onPassValidate={async () => {
          if (
            currentChunkIndex ===
            (paragraphList?.[currentParagraph]?.chunks?.length || 0) - 1
          ) {
            if (currentParagraph === paragraphList.length - 1) {
              setShowFireworks(true);
              setShowFireworks(true);
              playSuccessSound();
              await updatePracticeStatistic(id as string, 'parctice');
            } else {
              setCurrentParagraph(currentParagraph + 1);
              setCurrentChunkIndex(0);
            }
          } else {
            setCurrentChunkIndex(currentChunkIndex + 1);
          }
        }}
        onNext={() => {
          if (
            currentChunkIndex ===
            (paragraphList?.[currentParagraph]?.chunks?.length || 0) - 1
          ) {
            if (currentParagraph === paragraphList.length - 1) {
              return;
            } else {
              setCurrentParagraph(currentParagraph + 1);
              setCurrentChunkIndex(0);
            }
          } else {
            setCurrentChunkIndex(currentChunkIndex + 1);
          }
        }}
        disabeldPerv={currentChunkIndex === 0}
        disabled={false}
        addErrorRecord={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      {showFireworks ? <FireworksContainer /> : <></>}
      <CongratsModal
        visible={showFireworks}
        onAgainButtonClick={() => {
          setShowFireworks(false);
          setCurrentChunkIndex(0);
          setCurrentParagraph(0);
        }}
      />
    </>
  );
};

export default Game;
