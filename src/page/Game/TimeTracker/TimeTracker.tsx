// components/TimeTracker/TimeTracker.tsx
import React from 'react';
import styles from './TimeTracker.module.scss';
import { IBaseComProps } from '@/utils/base';

interface TimeTrackerProps extends IBaseComProps {
  activeTime: number;
}

const TimeTracker: React.FC<TimeTrackerProps> = ({ style, activeTime }) => {
  return (
    <div className={styles.timeTracker} style={style}>
      <span className={styles.icon}>⏱</span>
      <span>本次学习时长：</span>
      <span className={styles.time}>{activeTime}</span>
      <span> 秒</span>
    </div>
  );
};

export default TimeTracker;
