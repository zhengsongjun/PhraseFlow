import React from 'react';
import styles from './CongratsModal.module.scss';

interface Props {
  onClose?: () => void;
}

const CongratsModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>🎉 恭喜！</div>
        <div className={styles.quote}>
          <div className={styles.english}>
            Genuine effort turns challenges into stepping stones for real
            growth.
          </div>
          <div className={styles.chinese}>
            真诚的努力，能将阻碍转化为真正进步的垫脚石。
          </div>
        </div>
        <div className={styles.meta}>—— 金山词霸「每日一句」</div>

        <div className={styles.blocks}>
          <div className={styles.block}>
            <div className={styles.blockTitle}>📊 学习数据</div>
            <div className={styles.blockContent}>
              天啊，您竟然在 <strong>18秒</strong> 内解决了 1
              道题，您的脑细胞可能正在举行一场马拉松，希望它们还记得休息。🧠💨
            </div>
          </div>
          <div className={styles.block}>
            <div className={styles.blockTitle}>💡 学习小贴士</div>
            <div className={styles.blockContent}>
              学好英语的终极技巧：就是重复，重复，再重复。语言的肌肉记忆是最真实的力量！💪📚
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.primary}>炫耀战绩</button>
          <button onClick={onClose}>再来一次</button>
          <button>下一课</button>
        </div>
      </div>
    </div>
  );
};

export default CongratsModal;
