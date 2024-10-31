import React from 'react';

import styles from './styles.module.css';

interface InputProps {
  placeholder: string;
  type?: 'text' | 'number' | 'email' | 'password';
  value: string | number;
  onChange: (value: string) => void;
}

const Input = (props: InputProps) => {
  const { 
    placeholder, 
    type = 'text', 
    value,
    onChange 
  } = props  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);
  };

  return (
    <div className={styles.inputWrapper}>
      <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  );
};

export default Input;