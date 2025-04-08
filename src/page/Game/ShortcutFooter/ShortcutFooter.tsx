import React, { useEffect } from 'react';
import styles from './ShortcutFooter.module.scss';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export interface ShortcutItem {
  keys: string[];
  label: string;
  onClick?: () => void;
}

interface ShortcutFooterProps {
  shortcuts: ShortcutItem[];
  onNext?: () => void;
  onPrev: () => void;
  disabledPrev: boolean;
}

const ShortcutFooter: React.FC<ShortcutFooterProps> = ({
  shortcuts,
  onNext,
  disabledPrev,
  onPrev,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && !disabledPrev) {
        onPrev?.();
      }
      if (e.key === 'ArrowRight' && onNext) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, disabledPrev]);

  return (
    <div className={styles.footer}>
      <div className={styles.shortcuts}>
        {!disabledPrev && (
          <div className={styles.nextButton} onClick={onPrev}>
            <ChevronLeft size={20} />
          </div>
        )}
        {shortcuts.map((item, index) => (
          <div
            key={index}
            className={styles.shortcut}
            onClick={item.onClick}
            role='button'
            tabIndex={0}
          >
            {item.keys.map((key, i) => (
              <kbd key={i} className={styles.key}>
                {key}
              </kbd>
            ))}
            <span className={styles.label}>{item.label}</span>
          </div>
        ))}
      </div>
      {onNext && (
        <div className={styles.nextButton} onClick={onNext}>
          <ChevronRight size={20} />
        </div>
      )}
    </div>
  );
};

export default ShortcutFooter;
