// components/HeatmapCard.tsx
import React from 'react';
import styles from './HeatmapCard.module.scss';
import ContributionCalendar from 'react-github-contribution-calendar';

type Props = {
  data: Record<string, number>;
  until: string;
};

const HeatmapCard: React.FC<Props> = ({ data, until }) => {
  return (
    <div className={styles.heatmapCard}>
      <h3>🔥 学习热力图</h3>
      <ContributionCalendar
        values={data}
        until={until}
        panelColors={['#1e293b', '#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd']}
        weekNames={['日', '一', '二', '三', '四', '五', '六']}
        monthNames={[
          '一月',
          '二月',
          '三月',
          '四月',
          '五月',
          '六月',
          '七月',
          '八月',
          '九月',
          '十月',
          '十一月',
          '十二月',
        ]}
      />
    </div>
  );
};

export default HeatmapCard;
