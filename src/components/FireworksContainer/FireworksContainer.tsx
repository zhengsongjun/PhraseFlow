import React, { useEffect, useRef } from 'react';
import { Fireworks } from 'fireworks-js';
import styles from './FireworksOverlay.module.scss';

interface Props {
  active?: boolean;
}

const FireworksOverlay: React.FC<Props> = ({ active = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !active) return;

    const fireworks = new Fireworks(containerRef.current, {
      autoresize: true,
      opacity: 0.5,
      acceleration: 1.05,
      friction: 0.97,
      gravity: 0.7, // 让烟花飞更高
      particles: 120,
      traceLength: 3,
      explosion: 5,
      rocketsPoint: { min: 10, max: 30 }, // 水平居中发射
      brightness: {
        min: 50,
        max: 80,
      },
    });

    fireworks.start();

    return () => fireworks.stop();
  }, [active]);

  return <div className={styles.fireworksContainer} ref={containerRef} />;
};

export default FireworksOverlay;
