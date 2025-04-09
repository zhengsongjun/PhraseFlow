// components/RecommendCourseCard.tsx
import React from 'react';
import styles from './RecommendCourseCard.module.scss';

const RecommendCourseCard: React.FC = () => {
  return (
    <div className={styles.courseHighlight}>
      <img src='/images/course-highlight.jpg' alt='推荐课程' />
      <div>
        <h4>🎯 热门推荐</h4>
        <p>你可能对「未来语法进阶篇」感兴趣</p>
        <button>立即学习</button>
      </div>
    </div>
  );
};

export default RecommendCourseCard;
