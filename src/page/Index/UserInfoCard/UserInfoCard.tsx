import React from 'react';
import styles from './UserInfoCard.module.scss';
import image from '@/assets/R.jpeg'; // 替换为你的头像资源路径
import { IBaseComProps } from '@/utils/base';

export interface IUserInfoCard extends IBaseComProps {
  count: string;
  weekCount: string;
  monthCount: string;
}

const UserInfoCard: React.FC<IUserInfoCard> = (props) => {
  const { count, weekCount, monthCount } = props;
  return (
    <div className={styles.userInfoCard}>
      <img src={image} alt='头像' className={styles.avatar} />
      <div className={styles.infoContent}>
        <h2>欢迎回来，超级学习者！</h2>
        <p>
          你已经连续学习 <strong>5 天</strong>，击败了 87% 的学习者 ✨
        </p>
        <ul>
          <li>
            📈 学习时长：{count} 小时 本周学习时长：{weekCount} 本月学习时长:
            {monthCount}
          </li>
          <li>🔥 连续打卡：5 天</li>
          <li>🏅 完成课程：6 节</li>
        </ul>
      </div>
    </div>
  );
};

export default UserInfoCard;
