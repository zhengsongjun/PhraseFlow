import React, { useEffect, useState } from 'react';
import styles from './CongratsModal.module.scss';
import { getRandomQuote } from '@/services/quote';
import { Link } from 'react-router-dom';

interface ICongratsModalProps {
  visible: boolean;
  onAgainButtonClick: () => void;
  onEscPress?: () => void;
  onEnterPress?: () => void;
}

const CongratsModal: React.FC<ICongratsModalProps> = (props) => {
  const { visible, onAgainButtonClick, onEscPress, onEnterPress } = props;
  const [quote, setQuote] = useState({ english: '', chinese: '', author: '' });

  const handleGetQuote = async () => {
    const result = await getRandomQuote();
    setQuote({
      english: result.quoteEn,
      chinese: result.quotenZh,
      author: result.author,
    });
  };

  useEffect(() => {
    if (visible) {
      handleGetQuote();
    }
  }, [visible]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!visible) return;

      if (e.key === 'Escape') {
        onEscPress?.(); // 按下 Esc 时调用
      } else if (e.key === 'Enter') {
        onEnterPress?.(); // 按下 Enter 时调用
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible, onEscPress, onEnterPress]);

  return (
    <>
      {visible ? (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <div className={styles.header}>🎉 恭喜！</div>
            <div className={styles.quote}>
              <div className={styles.english}>{quote.english}</div>
              <div className={styles.chinese}>{quote.chinese}</div>
            </div>
            <div className={styles.meta}>-- {quote.author}</div>

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
              <button
                onClick={() => {
                  onAgainButtonClick();
                }}
              >
                <span
                  style={{
                    border: '1px solid #ccc',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    marginRight: '6px',
                    fontSize: '12px',
                    backgroundColor: '#f0f0f0',
                    color: 'black',
                  }}
                >
                  Esc
                </span>
                再来一次
              </button>
              <Link to='/index'>
                <button>
                  <span
                    style={{
                      border: '1px solid #ccc',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      marginRight: '6px',
                      fontSize: '12px',
                      backgroundColor: '#f0f0f0',
                      color: 'black',
                    }}
                  >
                    ⏎
                  </span>
                  回到首页
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CongratsModal;
