import useToArticleIdGetChunk from '@/hook/serviceCustomHook/useToArticleIdGetChunk';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePracticeTracker } from '@/hook/serviceCustomHook/usePracticeTracker';
import TimeTracker from '../Game/TimeTracker/TimeTracker';
import SentencePractice from '../../components/SentencePractice/SentencePractice';
import VerticalProgressBar from './VerticalProgressBar/VerticalProgressBar';
import { toSmartArticleIdGetChunkList } from '@/services/chunk';
import { Chunk } from '@/services/api/model';
import FireworksContainer from '@/components/FireworksContainer/FireworksContainer';
import CongratsModal from '@/components/CongratsModal/CongratsModal';
import { updatePracticeStatistic } from '@/services/practiceStatistic';

const Game = () => {
  const { id } = useParams<{ id: string }>();
  const { activeTime } = usePracticeTracker({ page: 'practice' });
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const currentChunk = (chunks || [])![currentChunkIndex];
  const init = async () => {
    const reuslt = await toSmartArticleIdGetChunkList(id as string);
    setChunks(
      reuslt.sort((a, b) => {
        return a.sort - b.sort;
      }) as any
    );
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <TimeTracker style={{ margin: 20 }} activeTime={activeTime} />
      <VerticalProgressBar
        style={{
          position: 'fixed',
          right: ' 24px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 999,
        }}
        progress={Math.round((currentChunkIndex / (chunks.length || 1)) * 100)}
      />
      {currentChunk ? (
        <SentencePractice
          onPerv={() => {
            setCurrentChunkIndex(currentChunkIndex - 1);
          }}
          speechRate={0.8}
          phonetic={currentChunk.phonetic || ''}
          sentence={currentChunk.text}
          translation={currentChunk.definition}
          onPassValidate={async () => {
            if (currentChunkIndex === chunks.length - 1) {
              setShowFireworks(true);
              await updatePracticeStatistic(id as string, 'smart');
            } else {
              setCurrentChunkIndex(currentChunkIndex + 1);
            }
          }}
          onNext={() => {
            if (currentChunkIndex > chunks.length - 2) {
              return;
            } else {
              setCurrentChunkIndex(currentChunkIndex + 1);
            }
          }}
          disabeldPerv={currentChunkIndex === 0}
        />
      ) : (
        <></>
      )}
      {showFireworks ? <FireworksContainer /> : <></>}
      <CongratsModal
        visible={showFireworks}
        onAgainButtonClick={() => {
          setShowFireworks(false);
          setCurrentChunkIndex(0);
        }}
      />
    </>
  );
};

export default Game;
