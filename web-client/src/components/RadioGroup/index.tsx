import { useState } from 'react';

import styles from './styles.module.css';

interface Option {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: Option[];
  name: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  className?: string;
}

const RadioGroup = (props: RadioGroupProps) => {
  const { options, name, defaultValue, onChange, className = '' } = props

  const [selectedValue, setSelectedValue] = useState<string>(defaultValue ?? options[0]?.value ?? '');

  const handleChange = (value: string): void => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className={`${styles.radioGroup} ${className}`}>
      {options.map((option) => (
        <label key={option.value} className={styles.radioLabel}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => handleChange(option.value)}
            className={styles.radioInput}
          />
          <span className={styles.radioButton}>
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;