import React from 'react';
import styles from './PronounceCard.module.scss';
import { IBaseComProps } from '@/utils/base';

interface PronounceCardProps extends IBaseComProps {
  word: string;
  phonetic: string;
  visible: boolean;
}

const PronounceCard: React.FC<PronounceCardProps> = ({
  word,
  phonetic,
  visible,
  style,
}) => {
  if (!visible) return null;

  return (
    <div style={style} className={styles.card}>
      <div className={styles.word}>{word}</div>
      <div className={styles.phonetic}>/{phonetic}/</div>
    </div>
  );
};

export default PronounceCard;
