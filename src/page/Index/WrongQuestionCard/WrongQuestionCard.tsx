// components/WrongQuestionCard.tsx
import React from 'react';
import styles from './WrongQuestionCard.module.scss';

const WrongQuestionCard: React.FC = () => {
  return (
    <div className={styles.wrongCard}>
      <h3>错题概览</h3>
      <ul>
        <li>📘 单词错误：12 题</li>
        <li>🧠 语法错误：5 题</li>
        <li>📖 阅读理解标记：3 条</li>
      </ul>
      <button>进入错题本 →</button>
    </div>
  );
};

export default WrongQuestionCard;
