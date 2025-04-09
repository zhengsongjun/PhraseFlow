import React from 'react';
import styles from './UserInfoCard.module.scss';
import image from '@/assets/R.jpeg'; // 替换为你的头像资源路径

const UserInfoCard = () => {
  return (
    <div className={styles.userInfoCard}>
      <img src={image} alt='头像' className={styles.avatar} />
      <div className={styles.infoContent}>
        <h2>欢迎回来，超级学习者！</h2>
        <p>
          你已经连续学习 <strong>5 天</strong>，击败了 87% 的学习者 ✨
        </p>
        <ul>
          <li>📈 学习时长：12 小时</li>
          <li>🔥 连续打卡：5 天</li>
          <li>🏅 完成课程：6 节</li>
        </ul>
      </div>
    </div>
  );
};

export default UserInfoCard;
