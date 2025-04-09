import {
  getCurrentDayActiveTime,
  getCurrentMonthActiveTime,
  getCurrentWeekActiveTimeMap,
} from '@/services/count';
import { useEffect, useState } from 'react';

type TimeMap = Record<string, number>;

const formatSecondsToHMS = (totalSeconds: number): string => {
  const h = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, '0');
  const m = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, '0');
  return `${h}:${m}:${s}`;
};

export const useCountActive = () => {
  const [dayTotal, setDayTotal] = useState('00:00:00');
  const [weekTotal, setWeekTotal] = useState('00:00:00');
  const [monthTotal, setMonthTotal] = useState('00:00:00');
  const [weekMap, setWeekMap] = useState<TimeMap>({});
  const [monthMap, setMonthMap] = useState<TimeMap>({});

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [dayRes, weekRes, monthRes] = await Promise.all([
          getCurrentDayActiveTime(),
          getCurrentWeekActiveTimeMap(),
          getCurrentMonthActiveTime(),
        ]);

        const weekData = weekRes || {};
        const monthData = monthRes || {};

        setWeekMap(weekData);
        setMonthMap(monthData);

        const daySec = Number(dayRes || 0);
        const weekSec = Object.values(weekData).reduce(
          (acc, cur) => acc + cur,
          0
        );
        const monthSec = Object.values(monthData).reduce(
          (acc, cur) => acc + cur,
          0
        );

        setDayTotal(formatSecondsToHMS(daySec));
        setWeekTotal(formatSecondsToHMS(weekSec));
        setMonthTotal(formatSecondsToHMS(monthSec));
      } catch (error) {
        console.error('获取活跃时间失败:', error);
      }
    };

    fetchAll();
  }, []);

  return {
    dayTotal, // '01:22:00'
    weekTotal, // '05:45:30'
    monthTotal, // '22:01:12'
    weekMap, // 原始秒数
    monthMap, // 原始秒数
  };
};
