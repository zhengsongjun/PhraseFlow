// components/TimeTracker/TimeTracker.tsx
import React from 'react';
import styles from './TimeTracker.module.scss';
import { IBaseComProps } from '@/utils/base';

interface TimeTrackerProps extends IBaseComProps {
  activeTime: number; // 秒数
}

const formatTime = (seconds: number): string => {
  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
};

const TimeTracker: React.FC<TimeTrackerProps> = ({ style, activeTime }) => {
  return (
    <div className={styles.timeTracker} style={style}>
      <span className={styles.icon}>⏱</span>
      <span>本次学习时长：</span>
      <span className={styles.time}>{formatTime(activeTime)}</span>
    </div>
  );
};

export default TimeTracker;
