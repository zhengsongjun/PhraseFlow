// components/LearningTrendCard.tsx
import React from 'react';
import styles from './LearningTrendCard.module.scss';
import { Line, Bar } from 'react-chartjs-2';

type Mode = 'day' | 'week' | 'month';

type Props = {
  mode: Mode;
  onChangeMode: (m: Mode) => void;
  chartConfig: Record<Mode, any>;
};

const LearningTrendCard: React.FC<Props> = ({
  mode,
  onChangeMode,
  chartConfig,
}) => {
  return (
    <div className={styles.chartCard}>
      <div className={styles.chartCardWrapper}>
        <h3>📊 学习趋势</h3>
        <div className={styles.tabBtns}>
          <button
            onClick={() => onChangeMode('day')}
            className={mode === 'day' ? styles.active : ''}
          >
            今日
          </button>
          <button
            onClick={() => onChangeMode('week')}
            className={mode === 'week' ? styles.active : ''}
          >
            本周
          </button>
          <button
            onClick={() => onChangeMode('month')}
            className={mode === 'month' ? styles.active : ''}
          >
            本月
          </button>
        </div>
      </div>
      <div className={styles.chartPlaceholder}>
        {mode === 'day' ? (
          <Bar data={chartConfig.day} options={{ responsive: true }} />
        ) : (
          <Line data={chartConfig[mode]} options={{ responsive: true }} />
        )}
      </div>
    </div>
  );
};

export default LearningTrendCard;
