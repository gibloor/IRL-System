import React from 'react';

import styles from './styles.module.css';

interface InputProps {
  placeholder: string;
  type?: 'text' | 'number' | 'email' | 'password';
  value: string | number;
  onChange: (value: string) => void;
  label?: string;
  width?: number;
}

const Input = (props: InputProps) => {
  const { 
    placeholder, 
    type = 'text', 
    value,
    label,
    onChange,
    width,
  } = props  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
  };

  return (
    <div className={styles.inputWrapper}>
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
        className={styles.input}
        style={{ width: width ? `${width}px`: '225px'}}
      />
    </div>
  );
};

export default Input;