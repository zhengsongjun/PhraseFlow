import React, { useState } from 'react';
import styles from './CardSet.module.scss';
import { Paragraph } from '@/services/api/model';

interface ICardProps extends Paragraph {
  total: number;
  process: number;
}

type ICardListProps = ICardProps[];

interface ICardSetProps {
  data: ICardListProps;
  current: number;
  onCardItemClick: (index: number) => void;
}

const CardSet: React.FC<ICardSetProps> = (props) => {
  const { data: cards, current, onCardItemClick } = props;
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  if (collapsed) {
    const totalProcess = cards.reduce((acc, c) => acc + c.process, 0);
    const total = cards.reduce((acc, c) => acc + c.total, 0);
    const progress = total > 0 ? (totalProcess / total) * 100 : 0;

    return (
      <div className={styles.cardSetCollapsed}>
        <div className={styles.verticalProgressWrapper}>
          <div className={styles.verticalProgressTrack}>
            <div
              className={styles.verticalProgressBar}
              style={{ height: `${progress}%` }}
            />
          </div>
          <p className={styles.verticalProgressText}>
            {totalProcess} / {total}
          </p>
        </div>
        <button className={styles.toggleButton} onClick={handleToggleCollapse}>
          展开
        </button>
      </div>
    );
  }

  return (
    <div className={styles.cardSet}>
      <button className={styles.toggleButton} onClick={handleToggleCollapse}>
        收起
      </button>
      {cards.map((card, index) => {
        const progress = (card.process / card.total) * 100;
        return (
          <div
            key={card.id}
            className={`${styles.card} ${index === current ? styles.current : ''}`}
            onClick={() => {
              onCardItemClick(index);
            }}
          >
            <div className={styles.cardHeader}>
              <h3>Article {index + 1}</h3>
              <p className={styles.status}>
                {index === 0 ? '当前正在进行' : ''}
              </p>
            </div>
            <div className={styles.cardBody}>
              <p className={`${styles.text} ${styles.ellipsisTwoLines}`}>
                {card.translation}
              </p>
              <p className={`${styles.translation} ${styles.ellipsisTwoLines}`}>
                {card.text}
              </p>
              <div className={styles.progressBarWrapper}>
                <div
                  className={styles.progressBar}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className={styles.taskCount}>
                {card.process} / {card.total} completed
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardSet;
