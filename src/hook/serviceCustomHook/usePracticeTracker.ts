import { useEffect, useRef, useState } from 'react';

interface PracticeTrackerOptions {
  page: string;
}

export const usePracticeTracker = ({ page }: PracticeTrackerOptions) => {
  const [activeTime, setActiveTime] = useState(0);
  const activeTimeRef = useRef(0);
  const isActive = useRef(true);
  const isVisible = useRef(true); // 👈 页面是否可见
  const timer = useRef<NodeJS.Timeout | null>(null);
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = () => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      isActive.current = false;
    }, 60000);
  };

  const onUserActivity = () => {
    if (isVisible.current) {
      isActive.current = true;
      resetInactivityTimer();
    }
  };

  const uploadTime = () => {
    const token = localStorage.getItem('token');
    const payload = {
      page,
      startTime: new Date().toISOString(),
      duration: activeTimeRef.current,
    };
    const body = JSON.stringify(payload);
    fetch('/api/active-log', {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      keepalive: true, // ✅ 页面关闭也发得出去
    });
  };

  useEffect(() => {
    timer.current = setInterval(() => {
      if (isVisible.current && isActive.current) {
        setActiveTime((t) => {
          activeTimeRef.current = t + 1; // 👈 同步更新最新值
          return t + 1;
        });
      }
    }, 1000);

    const handleVisibilityChange = () => {
      isVisible.current = document.visibilityState === 'visible';
      if (isVisible.current) {
        resetInactivityTimer();
      } else {
        isActive.current = false;
      }
    };

    resetInactivityTimer();
    window.addEventListener('mousemove', onUserActivity);
    window.addEventListener('keydown', onUserActivity);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // ✅ 页面关闭时（浏览器关闭/刷新）
    window.addEventListener('beforeunload', uploadTime);

    // ✅ 页面组件卸载时（如切换路由）
    return () => {
      console.log('[hook cleanup] 组件卸载上传数据');
      uploadTime(); // ✅ 就在这里触发上传！

      if (timer.current) clearInterval(timer.current);
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);

      window.removeEventListener('mousemove', onUserActivity);
      window.removeEventListener('keydown', onUserActivity);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', uploadTime);
    };
  }, []);

  return { activeTime };
};
