import useToArticleIdGetChunk from '@/hook/serviceCustomHook/useToArticleIdGetChunk';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { usePracticeTracker } from '@/hook/serviceCustomHook/usePracticeTracker';
import TimeTracker from '../Game/TimeTracker/TimeTracker';
import SentencePractice from '../../components/SentencePractice/SentencePractice';
import VerticalProgressBar from './VerticalProgressBar/VerticalProgressBar';
import { toSmartArticleIdGetChunkList } from '@/services/chunk';
import { Chunk } from '@/services/api/model';
import FireworksContainer from '@/components/FireworksContainer/FireworksContainer';
import CongratsModal from '@/components/CongratsModal/CongratsModal';
import { updatePracticeStatistic } from '@/services/practiceStatistic';
import { createErrorRecord } from '@/services/errorRecords';
import { Howl } from 'howler';
import vMp3 from '@/assets/v.mp3';
const Game = () => {
  const { id, type: jsonType } = useParams<{ id: string; type: string }>();
  const type = JSON.parse(jsonType as string);
  const { activeTime } = usePracticeTracker({ page: 'practice' });
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const currentChunk = (chunks || [])![currentChunkIndex];
  const soundRef = useRef<Howl | null>(null);

  const formatterChunk = (type: string[], chunkList: Chunk[]) => {
    return chunkList
      .filter((item) => type.includes(item.chunkType))
      .sort((a, b) => {
        return a.sort - b.sort;
      });
  };

  const playSuccessSound = () => {
    const sound = new Howl({
      src: [vMp3],
      volume: 1,
    });
    sound.play();
    soundRef.current = sound;
  };

  const init = async () => {
    const reuslt = await toSmartArticleIdGetChunkList(id as string);
    console.log(formatterChunk(type, reuslt));
    setChunks(formatterChunk(type, reuslt));
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
        total={chunks.length}
        current={currentChunkIndex + 1}
      />
      {currentChunk ? (
        <SentencePractice
          disabled={showFireworks}
          onPerv={() => {
            setCurrentChunkIndex(currentChunkIndex - 1);
          }}
          addErrorRecord={() => {
            createErrorRecord(id as string, chunks[currentChunkIndex].id);
          }}
          speechRate={0.8}
          phonetic={currentChunk.phonetic || ''}
          sentence={currentChunk.text}
          translation={currentChunk.definition}
          onPassValidate={async () => {
            if (currentChunkIndex === chunks.length - 1) {
              setShowFireworks(true);
              playSuccessSound();
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
        onEscPress={() => {
          setShowFireworks(false);
          setCurrentChunkIndex(0);
          soundRef.current?.stop();
        }}
        // onEnterPress={() => {
        //   setShowFireworks(false);
        // }}
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
