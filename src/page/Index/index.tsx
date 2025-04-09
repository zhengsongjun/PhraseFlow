// index.tsx
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from 'chart.js';
import UserInfoCard from './UserInfoCard/UserInfoCard';
import LearningTrendCard from './LearningTrendCard/LearningTrendCard';
import ReviewSummaryCard from './ReviewSummaryCard/ReviewSummaryCard';
import WrongQuestionCard from './WrongQuestionCard/WrongQuestionCard';
import RecommendCourseCard from './RecommendCourseCard/RecommendCourseCard';
import HeatmapCard from './HeatmapCard/HeatmapCard';
import RecentStudyCard from './RecentStudyCard/RecentStudyCard';
import {
  getCurrentDayActiveTime,
  getCurrentMonthActiveTime,
  getCurrentWeekActiveTimeMap,
} from '@/services/count';

ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale
);

const Dashboard = () => {
  const [mode, setMode] = useState<'day' | 'week' | 'month'>('day');
  const today = new Date();
  const heatmapData: Record<string, number> = {};
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    heatmapData[date.toISOString().split('T')[0]] = Math.floor(
      Math.random() * 5
    );
  }

  useEffect(() => {
    getCurrentDayActiveTime();
    getCurrentMonthActiveTime();
    getCurrentWeekActiveTimeMap();
  }, []);

  const hourlyData = Array.from({ length: 24 }, (_, i) => i);
  const weekData = ['日', '一', '二', '三', '四', '五', '六'];
  const monthData = Array.from({ length: 30 }, (_, i) => i + 1);

  const mockValue = () => Math.floor(Math.random() * 120);

  const chartConfig = {
    day: {
      labels: hourlyData.map((h) => `${h}:00`),
      datasets: [
        {
          label: '今日学习 (分钟)',
          data: hourlyData.map(mockValue),
          backgroundColor: '#00e5ff',
        },
      ],
    },
    week: {
      labels: weekData,
      datasets: [
        {
          label: '本周学习 (分钟)',
          data: weekData.map(mockValue),
          borderColor: '#00e5ff',
          backgroundColor: 'rgba(0, 229, 255, 0.1)',
          tension: 0.3,
          fill: true,
        },
      ],
    },
    month: {
      labels: monthData.map((d) => `${d}号`),
      datasets: [
        {
          label: '本月学习 (分钟)',
          data: monthData.map(mockValue),
          borderColor: '#00e5ff',
          backgroundColor: 'rgba(0, 229, 255, 0.1)',
          tension: 0.3,
          fill: true,
        },
      ],
    },
  };

  return (
    <div className={styles.pageLayout}>
      <div className={styles.mainColumn}>
        <div className={styles.userInfo}>
          <UserInfoCard />
        </div>

        <div className={styles.rowPair}>
          <div className={styles.recent}>
            <RecentStudyCard />
          </div>
          <div className={styles.wrong}>
            <WrongQuestionCard />
          </div>
        </div>

        <div className={styles.learning}>
          <RecommendCourseCard />
        </div>
      </div>

      <div className={styles.sideColumn}>
        <div className={styles.achievement}>
          <LearningTrendCard
            mode={mode}
            onChangeMode={setMode}
            chartConfig={chartConfig}
          />
        </div>
        <div className={styles.heatmap}>
          <HeatmapCard
            data={heatmapData}
            until={today.toISOString().split('T')[0]}
          />
        </div>
        <div className={styles.review}>
          <ReviewSummaryCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
