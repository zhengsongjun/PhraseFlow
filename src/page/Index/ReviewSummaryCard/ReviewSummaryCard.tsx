// components/ReviewSummaryCard.tsx
import React from 'react';
import styles from './ReviewSummaryCard.module.scss';

const ReviewSummaryCard: React.FC = () => {
  return (
    <div className={styles.reviewCard}>
      <h3>🧠 重要复习</h3>
      <ul>
        <li>📌 一般现在时</li>
        <li>📌 高频短语练习</li>
        <li>📌 阅读理解第二组</li>
        <li>📌 模拟题测试（语法篇）</li>
      </ul>
      <button>进入复习中心</button>
    </div>
  );
};

export default ReviewSummaryCard;
