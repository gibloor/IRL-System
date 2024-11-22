import { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface StatProgressBarProps {
  label: string;
  value: number;
  maxValue?: number;
}

const StatProgressBar = (props: StatProgressBarProps) => {
  const { label, value, maxValue = 100 } = props;

  const [prevValue, setPrevValue] = useState(value);
  const [isIncreasing, setIsIncreasing] = useState(false);
  const [isDecreasing, setIsDecreasing] = useState(false);

  useEffect(() => {
    if (value > prevValue) {
      setIsIncreasing(true);
      setIsDecreasing(false);
    } else if (value < prevValue) {
      setIsIncreasing(false);
      setIsDecreasing(true);
    }

    const timer = setTimeout(() => {
      setPrevValue(value);
      setIsIncreasing(false);
      setIsDecreasing(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [value, prevValue]);

  const percentage = Math.min((value / maxValue) * 100, 100);
  const isOverMaxed = value > maxValue;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={`${styles.label}`}>
          {label}
        </span>
        <span className={`${styles.value} ${isOverMaxed ? styles.overmax : styles.normal}`}>
          {value}/{maxValue}
        </span>
      </div>
      
      <div className={`${styles.progressContainer} ${isOverMaxed ? styles.overmax : styles.normal}`}>
        <div 
          className={`${styles.progressBar} ${
            isOverMaxed 
              ? styles.overmax 
              : isIncreasing 
                ? styles.increasing 
                : isDecreasing 
                  ? styles.decreasing 
                  : styles.normal
          }`}
          style={{ width: `${percentage}%` }}
        >
          <div className={styles.shine} style={{ width: `${percentage}%` }} />
          
          {isOverMaxed && (
            <div className={`${styles.glowEffect} ${styles.overmax}`} />
          )}
          {isIncreasing && !isOverMaxed && (
            <div className={`${styles.glowEffect} ${styles.increase}`} />
          )}
          {isDecreasing && !isOverMaxed && (
            <div className={`${styles.glowEffect} ${styles.decrease}`} />
          )}
        </div>
      </div>
    </div>
  );
};


export default StatProgressBar;