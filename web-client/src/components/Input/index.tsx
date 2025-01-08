import React, { CSSProperties, KeyboardEvent, RefObject } from 'react';

import styles from './styles.module.css';

interface InputProps {
  placeholder: string;
  type?: 'text' | 'number' | 'email' | 'password';
  value: string | number;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
  wrapperClassName?: string
  style?: CSSProperties & {
    [key: string]: string;
  };
  inputRef?: RefObject<HTMLInputElement>
  disabled?: boolean
  onFocus?: () => void
  onBlur?: () => void
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
}

const Input = (props: InputProps) => {
  const { 
    placeholder, 
    type = 'text', 
    value,
    label,
    onChange,
    className,
    wrapperClassName,
    style,
    inputRef,
    disabled,
    onFocus,
    onBlur,
    onKeyDown,
  } = props  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
  };

  return (
    <div className={`${styles.inputWrapper} ${wrapperClassName}`} style={style}>
      {label ?
        <label className={styles.label}>
          {label}
        </label> : null
      }
      <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`${styles.input} ${className}`}
        ref={inputRef}
        style={style}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default Input;