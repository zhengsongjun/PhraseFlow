import React from 'react';
import styles from './RecentStudyCard.module.scss';

const RecentStudyCard: React.FC = () => {
  const courses = [
    {
      title: '未来语法第一课',
      progress: 75,
      image: '/images/course1.jpg',
    },
    {
      title: '英语词汇挑战',
      progress: 40,
      image: '/images/course2.jpg',
    },
  ];

  return (
    <div className={styles.recentStudy}>
      <h3>📚 最近学习</h3>
      {courses.map((course, index) => (
        <div className={styles.recentItem} key={index}>
          <img src={course.image} alt={course.title} />
          <div>
            <p>{course.title}</p>
            <div className={styles.progressBar}>
              <div style={{ width: `${course.progress}%` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentStudyCard;
