import React from 'react';
import styles from './VerticalProgressBar.module.scss';
import { IBaseComProps } from '@/utils/base';

interface Props extends IBaseComProps {
  progress: number; // 0 ~ 100
}

const VerticalProgressBar: React.FC<Props> = ({ progress, style }) => {
  return (
    <div className={styles.container} style={style}>
      <div className={styles.track}>
        <div className={styles.fill} style={{ height: `${progress}%` }} />
      </div>
      <div className={styles.label}>{progress}%</div>
    </div>
  );
};

export default VerticalProgressBar;
