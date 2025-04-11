import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.scss';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.subtitle}>页面未找到</p>
      <p className={styles.description}>你访问的页面不存在或已被删除。</p>
      <button className={styles.button} onClick={() => navigate('/index')}>
        返回首页
      </button>
    </div>
  );
};

export default NotFound;
