'use client'

import React, { useState, useRef, useEffect } from 'react';

import styles from './styles.module.css';

interface TimeSelectorProps {
  onChange: (time: string) => void;
  value?: string;
  className?: string;
  label?: string;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ 
  onChange, 
  value = '12:00 AM',
  className = '',
  label,
}) => {
  const [time, setTime] = useState<string>(value);
  const [isHourOpen, setIsHourOpen] = useState<boolean>(false);
  const [isMinuteOpen, setIsMinuteOpen] = useState<boolean>(false);
  const [isPeriodOpen, setIsPeriodOpen] = useState<boolean>(false);

  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef<HTMLDivElement>(null);

  const hours: string[] = [
    '01', '02', '03', '04', '05', '06',
    '07', '08', '09', '10', '11', '12'
  ];
  const minutes: string[] = ['00', '15', '30', '45'];
  const periods: string[] = ['AM', 'PM'];

  const [hour, minute, period] = time.split(/[:\s]/);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (hourRef.current && !hourRef.current.contains(event.target as Node)) {
        setIsHourOpen(false);
      }
      if (minuteRef.current && !minuteRef.current.contains(event.target as Node)) {
        setIsMinuteOpen(false);
      }
      if (periodRef.current && !periodRef.current.contains(event.target as Node)) {
        setIsPeriodOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTimeChange = (type: 'hour' | 'minute' | 'period', newValue: string): void => {
    let newTime: string;
    if (type === 'hour') {
      newTime = `${newValue}:${minute} ${period}`;
      setIsHourOpen(false);
    } else if (type === 'minute') {
      newTime = `${hour}:${newValue} ${period}`;
      setIsMinuteOpen(false);
    } else {
      newTime = `${hour}:${minute} ${newValue}`;
      setIsPeriodOpen(false);
    }
    
    setTime(newTime);
    onChange?.(newTime);
  };

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={`${styles.container} ${className}`}>
        <div className={styles.selectorContainer} ref={hourRef}>
          <div 
            onClick={() => setIsHourOpen(!isHourOpen)}
            className={styles.selectorButton}
          >
            {hour}
          </div>
          {isHourOpen && (
            <div className={styles.dropdownContainer}>
              {hours.map((h) => (
                <div
                  key={h}
                  onClick={() => handleTimeChange('hour', h)}
                  className={styles.dropdownItem}
                >
                  {h}
                </div>
              ))}
            </div>
          )}
        </div>

        <span className={styles.separator}>:</span>

        <div className={styles.selectorContainer} ref={minuteRef}>
          <div 
            onClick={() => setIsMinuteOpen(!isMinuteOpen)}
            className={styles.selectorButton}
          >
            {minute}
          </div>
          {isMinuteOpen && (
            <div className={styles.dropdownContainer}>
              {minutes.map((m) => (
                <div
                  key={m}
                  onClick={() => handleTimeChange('minute', m)}
                  className={styles.dropdownItem}
                >
                  {m}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.selectorContainer} ref={periodRef}>
          <div 
            onClick={() => setIsPeriodOpen(!isPeriodOpen)}
            className={styles.selectorButton}
          >
            {period}
          </div>
          {isPeriodOpen && (
            <div className={styles.dropdownContainer}>
              {periods.map((p) => (
                <div
                  key={p}
                  onClick={() => handleTimeChange('period', p)}
                  className={styles.dropdownItem}
                >
                  {p}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeSelector;