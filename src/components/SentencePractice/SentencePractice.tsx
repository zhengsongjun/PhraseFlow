import React, { useEffect, useRef, useState } from 'react';
import styles from './SentencePractice.module.scss';
import ShortcutFooter from '../../page/Game/ShortcutFooter/ShortcutFooter';
import PronounceCard from '../../page/Game/PronounceCard/PronounceCard';
import inputMp3 from '@/assets/input.MP3';
interface SentencePracticeProps {
  sentence: string;
  translation: string;
  phonetic: string;
  onNext: () => void;
  onPerv: () => void;
  disabeldPerv: boolean;
  speechRate?: number;
  onPassValidate: () => void;
}
const isPrintableCharacter = (key: string) => {
  return key.length === 1 && !['Enter', 'Tab', ' '].includes(key);
};
const isWord = (token: string) => /^[a-zA-Z]+$/.test(token);

const SentencePractice: React.FC<SentencePracticeProps> = ({
  sentence,
  translation,
  phonetic,
  onNext,
  onPerv,
  disabeldPerv,
  onPassValidate,
  speechRate,
}) => {
  const tokens = sentence.split(/(\s+|[.,!?])/).filter((token) => token !== '');
  const wordIndices = tokens
    .map((token, idx) => (isWord(token) ? idx : -1))
    .filter((idx) => idx !== -1);
  const [pronounceCardVisible, setPronounceCardVisible] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [inputs, setInputs] = useState<string[]>(tokens.map(() => ''));
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [wrongIndices, setWrongIndices] = useState<number[]>([]);
  const [touchedIndices, setTouchedIndices] = useState<number[]>([]);
  const inputAudioRef = useRef<HTMLAudioElement | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const playAudioMultipleTimes = (text: string, times: number) => {
    let count = 0;

    const play = () => {
      if (count >= times) return;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = speechRate ?? 0.9; // 👈 使用传入的语速
      utterance.onend = () => {
        count++;
        play();
      };
      speechSynthesis.speak(utterance);
    };

    speechSynthesis.cancel();
    play();
  };

  const resetStates = () => {
    setInputs(tokens.map(() => '')); // 清空输入框
    setIsCorrect(null); // 重置验证结果
    setWrongIndices([]); // 清空错误索引
    setTouchedIndices([]); // 清空已触碰索引

    const firstWord = wordIndices[0];
    if (firstWord !== undefined) {
      inputRefs.current[firstWord]?.focus(); // 聚焦到第一个单词
    }

    playAudioMultipleTimes(sentence, 3); // 重播语音
  };

  const handleInputChange = (index: number, value: string) => {
    const updated = [...inputs];
    updated[index] = value;
    setInputs(updated);

    if (!touchedIndices.includes(index)) {
      setTouchedIndices([...touchedIndices, index]);
    }
  };
  const handleFocus = (index: number) => {
    if (wrongIndices.includes(index)) {
      const updated = [...inputs];
      updated[index] = '';
      setInputs(updated);
      setWrongIndices((prev) => prev.filter((i) => i !== index));
    }
  };

  const handleSentenceClick = () => {
    // 如果有错误词，聚焦第一个错误词
    if (wrongIndices.length > 0) {
      inputRefs.current[wrongIndices[0]]?.focus();
      return;
    }

    // 如果有空的格子，聚焦第一个空
    const firstEmpty = tokens.findIndex(
      (t, i) => isWord(t) && inputs[i].trim() === ''
    );
    if (firstEmpty !== -1) {
      inputRefs.current[firstEmpty]?.focus();
      return;
    }

    // 所有正确 → 聚焦最后一个输入框，并将光标移到末尾
    const lastWordIndex = [...wordIndices].reverse()[0];
    if (lastWordIndex !== undefined) {
      const input = inputRefs.current[lastWordIndex];
      if (input) {
        input.focus();

        // 把光标移动到末尾
        const val = input.value;
        input.setSelectionRange(val.length, val.length);
      }
    }
  };

  const handleSubmit = () => {
    const wrong: number[] = [];

    // 检查每个单词是否正确
    tokens.forEach((token, idx) => {
      if (isWord(token)) {
        const inputVal = inputs[idx].trim().toLowerCase();
        const targetVal = token.toLowerCase();
        if (inputVal !== targetVal) wrong.push(idx);
      }
    });

    // 如果没有错误，设置为正确，并允许继续
    setIsCorrect(wrong.length === 0);
    setWrongIndices(wrong);

    // 如果有错误，聚焦到第一个错误位置
    if (wrong.length > 0) {
      inputRefs.current[wrong[0]]?.focus();
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault(); // 阻止默认聚焦行为
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    // 处理退格键的逻辑
    if (key === 'Backspace') {
      const currentValue = inputs[focusedIndex ?? -1];
      const isWrong = wrongIndices.includes(focusedIndex ?? -1);

      if (isWrong) {
        e.preventDefault();
        const updated = [...inputs];
        updated[focusedIndex ?? 0] = '';
        setInputs(updated);
        setWrongIndices((prev) =>
          prev.filter((i) => i !== (focusedIndex ?? -1))
        );
        return;
      }

      if (currentValue === '' && focusedIndex && focusedIndex > 0) {
        e.preventDefault();
        const prevWordIndex = [...wordIndices]
          .reverse()
          .find((i) => i < focusedIndex);
        if (prevWordIndex !== undefined) {
          inputRefs.current[prevWordIndex]?.focus();
        }
      }
    }

    // 处理回车键的逻辑
    if (key === 'Enter') {
      handleSubmit(); // 如果输入不正确，进行验证
      e.stopPropagation();
    }

    // 处理空格和Tab键，跳转到下一个输入框
    if (key === ' ' || key === 'Tab') {
      const currentValue = inputs[focusedIndex ?? -1]?.trim();
      if (currentValue) {
        e.preventDefault();
        const nextWordIndex = wordIndices.find((i) => i > (focusedIndex ?? -1));
        if (nextWordIndex !== undefined) {
          inputRefs.current[nextWordIndex]?.focus();
        }
      } else {
        e.preventDefault(); // 空值时不跳转
      }
    }

    // 播放输入音效（打字/空格/Tab/退格键），排除组合键
    const shouldPlaySound =
      (isPrintableCharacter(key) ||
        key === 'Backspace' ||
        key === ' ' ||
        key === 'Tab') &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey;

    if (shouldPlaySound && inputAudioRef.current) {
      inputAudioRef.current.currentTime = 0;
      inputAudioRef.current.play().catch(() => {});
    }
  };

  const handleReset = () => {
    setInputs(tokens.map(() => ''));
    setIsCorrect(null);
    setWrongIndices([]);

    playAudioMultipleTimes(sentence, 3); // 每次重置时也朗读

    setTimeout(() => {
      const firstWord = wordIndices[0];
      if (firstWord !== undefined) inputRefs.current[firstWord]?.focus();
    }, 0);
  };
  const shortcuts = isCorrect
    ? [
        {
          keys: ['Esc'],
          label: '再来一次',
        },
        {
          keys: ['Ctrl', "'"],
          label: '播放发音',
          onClick: () => playAudioMultipleTimes(sentence, 3),
        },
        // {
        //   keys: ['Ctrl', ':'],
        //   label: '掌握',
        //   onClick: () => console.log('掌握'),
        // },
        {
          keys: ['Enter'],
          label: '下一题',
          onClick: () => {}, // 你需要实现这个
        },
        {
          keys: ['Ctrl', ':'],
          label: '显示答案',
          onClick: () => console.log('显示答案'),
        },
        {
          keys: ['Ctrl', 'Enter'],
          label: '再来一遍',
          onClick: handleReset,
        },
      ]
    : [
        {
          keys: ['Ctrl', "'"],
          label: '播放发音',
          onClick: () => playAudioMultipleTimes(sentence, 3),
        },
        {
          keys: ['Enter'],
          label: '提交',
          // onClick: () => handleSubmit(), // 你需要添加该函数逻辑
        },
        {
          keys: ['Ctrl', ':'],
          label: '显示答案',
          onClick: () => console.log('显示答案'),
        },
      ];

  useEffect(() => {
    const firstWordIndex = wordIndices[0];
    if (firstWordIndex !== undefined) {
      inputRefs.current[firstWordIndex]?.focus();
    }

    // 播放 3 次发音
    playAudioMultipleTimes(sentence, 3);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        if (wrongIndices.length > 0) {
          inputRefs.current[wrongIndices[0]]?.focus();
        } else {
          const firstEmpty = tokens.findIndex(
            (t, i) => isWord(t) && inputs[i] === ''
          );
          if (firstEmpty !== -1) {
            inputRefs.current[firstEmpty]?.focus();
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [sentence]);

  useEffect(() => {
    console.log(isCorrect, '变化');
  }, [isCorrect]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + ; 显示发音卡片
      if (e.ctrlKey && e.code === 'Semicolon') {
        setPronounceCardVisible((prev) => !prev);
        e.preventDefault();
      }

      // Ctrl + ' 播放发音两次
      if (e.ctrlKey && e.code === 'Quote') {
        e.preventDefault();
        playAudioMultipleTimes(sentence, 2);
      }
    };

    const handleClickOutside = () => {
      setPronounceCardVisible(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sentence]);

  const isInputActive = (idx: number) => {
    if (wrongIndices.includes(idx)) return 'wrong';
    if (focusedIndex === idx) return 'active';
    return 'inactive';
  };

  useEffect(() => {
    setInputs(tokens.map(() => ''));
    setIsCorrect(null);
    setWrongIndices([]);
    setTouchedIndices([]);

    // 默认高亮逻辑应该放在这里 👇
    const firstWord = wordIndices[0];
    setFocusedIndex(firstWord ?? null); // 设置为高亮
    speechSynthesis.cancel();
    const timer = setTimeout(() => {
      playAudioMultipleTimes(sentence, 2);
    }, 300);

    setTimeout(() => {
      if (firstWord !== undefined) {
        inputRefs.current[firstWord]?.focus();
      }
    }, 0);
    return () => {
      clearTimeout(timer); // 组件更新前清除上一次定时器
    };
  }, [sentence, translation, phonetic]);
  useEffect(() => {
    inputAudioRef.current = new Audio(inputMp3);
  }, []);

  useEffect(() => {
    // 全局监听键盘事件
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isCorrect) {
        setPronounceCardVisible(false);
        onPassValidate();
      }
      if (e.key === 'Escape' && isCorrect) {
        handleReset();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [isCorrect]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>{translation}</div>
      {isCorrect ? (
        <div className={styles.resultCard}>
          <h1 className={styles.word}>{sentence.trim()}</h1>
          <div className={styles.phonetic}>{phonetic}</div>
          <div className={styles.translation}>{translation}</div>
        </div>
      ) : (
        <div className={styles.sentence} onClick={handleSentenceClick}>
          {tokens.map((token, idx) =>
            isWord(token) ? (
              <div
                key={idx}
                className={`${styles.wordBlock} ${wrongIndices.includes(idx) ? styles.shake : ''}`}
              >
                {(() => {
                  const baseCharWidth = 32;
                  const sidePadding = 36;
                  const word = inputs[idx] || '';
                  const contentWidth =
                    Math.max(word.length, token.length) * baseCharWidth;
                  const totalWidth = contentWidth + sidePadding;

                  return (
                    <>
                      <input
                        ref={(el) => (inputRefs.current[idx] = el)}
                        type='text'
                        value={inputs[idx]}
                        onChange={(e) => handleInputChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, idx)}
                        onFocus={() => {
                          handleFocus(idx);
                          setFocusedIndex(idx);
                        }}
                        onBlur={() => {
                          setFocusedIndex(null);
                        }}
                        onMouseDown={handleMouseDown}
                        className={[
                          styles.input,
                          styles[isInputActive(idx)],
                        ].join(' ')}
                        style={{ width: `${totalWidth}px` }}
                      />
                      <div
                        className={[
                          styles.underline,
                          wrongIndices.includes(idx)
                            ? styles.wrong
                            : focusedIndex === idx
                              ? styles.active
                              : styles.inactive,
                        ].join(' ')}
                        style={{ width: `${totalWidth}px` }}
                      />
                    </>
                  );
                })()}
              </div>
            ) : (
              <span key={idx} className={styles.punctuation}>
                {token}
              </span>
            )
          )}
        </div>
      )}
      <ShortcutFooter
        shortcuts={shortcuts}
        onNext={onNext}
        onPrev={onPerv}
        disabledPrev={disabeldPerv}
      />
      <PronounceCard
        style={{
          position: 'absolute',
          top: '-20px',
          left: 0,
          right: 0,
          margin: '0 auto',
          width: 'fit-content', // 需要指定宽度
          textAlign: 'center',
          zIndex: '9999',
        }}
        word={sentence}
        phonetic={phonetic}
        visible={pronounceCardVisible}
      />
    </div>
  );
};

export default SentencePractice;
