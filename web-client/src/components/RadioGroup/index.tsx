import { useState } from 'react';

import styles from './styles.module.css';

export interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  disabledReason?: string;
}

interface RadioGroupProps {
  options: Option[];
  name: string;
  onChange: (value: string | string[]) => void;
  className?: string;
  label?: string;
  mode?: 'single' | 'multiple'
}

const RadioGroup = (props: RadioGroupProps) => {
  const { 
    options, 
    name,
    onChange, 
    className = '',
    label,
    mode = 'single'
  } = props;

  const [selectedValue, setSelectedValue] = useState<string | string[]>(
    mode === 'multiple' ? [options[0]?.value] : options[0]?.value
  );

  const handleChange = (value: string, disabled?: boolean): void => {
    if (disabled) return;

    if (mode === 'multiple') {
      const currentSelected = selectedValue as string[];
      const newValue = currentSelected.includes(value)
        ? currentSelected.filter(v => v !== value)
        : [...currentSelected, value];
      
      setSelectedValue(newValue);
      onChange(newValue);
    } else {
      setSelectedValue(value);
      onChange(value);
    }
  };

  const isSelected = (value: string) => {
    return mode === 'multiple'
      ? (selectedValue as string[]).includes(value)
      : selectedValue === value;
  };    

  return (
    <div className={styles.container}>
      <p className={styles.label}>
        {label}
      </p>

      <div className={`${styles.radioGroup} ${className}`}>
        {options.map(option => (
          <label
            key={option.value} 
            className={`${styles.radioLabel} ${option.disabled ? styles.radioLabelDisabled : ''} ${option.icon ? 'icon-container' : ''} ${isSelected(option.value) ? styles.selected : ''}`}
          >
            <input
              type={mode === 'multiple' ? 'checkbox' : 'radio'}
              name={name}
              value={option.value}
              checked={isSelected(option.value)}
              onChange={() => handleChange(option.value, option.disabled)}
              className={styles.radioInput}
              disabled={option.disabled}
            />
            <div className={styles.radioButton}>
              {option.icon && (
                <div className={`icon-wrapper ${isSelected(option.value) ? 'active' : ''}`}>
                  {option.icon}
                </div>
              )}
              
              <div className={styles.radioButtonContent}>
                {option.label}
              </div>
              
              {option.disabled && option.disabledReason && (
                <div className={styles.disabledOverlay}>
                  <span className={styles.disabledReason}>
                    {option.disabledReason}
                  </span>
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
    
    </div>
  );
};

export default RadioGroup;