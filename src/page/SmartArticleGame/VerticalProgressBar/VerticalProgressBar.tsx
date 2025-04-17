import React from 'react';
import styles from './VerticalProgressBar.module.scss';
import { IBaseComProps } from '@/utils/base';

interface Props extends IBaseComProps {
  total: number; // 0 ~ 100
  current: number;
}

const VerticalProgressBar: React.FC<Props> = (props) => {
  const { total, current, style } = props;
  return (
    <div className={styles.container} style={style}>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{
            height: `${Math.round((current / (total || 1)) * 100)}%`,
          }}
        />
      </div>
      <div className={styles.label}>{`${current}/${total}`}</div>
    </div>
  );
};

export default VerticalProgressBar;
