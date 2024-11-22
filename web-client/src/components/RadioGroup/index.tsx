import { useState } from 'react';

import styles from './styles.module.css';

interface Option {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  disabledReason?: string;
}

interface RadioGroupProps {
  options: Option[];
  name: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  className?: string;
  label?: string;
}

const RadioGroup = (props: RadioGroupProps) => {
  const { 
    options, 
    name, 
    defaultValue, 
    onChange, 
    className = '',
    label
  } = props;

  const [selectedValue, setSelectedValue] = useState<string>(
    defaultValue ?? options[0]?.value ?? ''
  );

  const handleChange = (value: string, disabled?: boolean): void => {
    if (!disabled) {
      setSelectedValue(value);
      onChange(value);
    }
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
            className={`${styles.radioLabel} ${option.disabled ? styles.radioLabelDisabled : ''} ${option.icon ? 'icon-container' : ''}`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => handleChange(option.value, option.disabled)}
              className={styles.radioInput}
              disabled={option.disabled}
            />
            <div className={styles.radioButton}>
              {option.icon && (
                <div className={`icon-wrapper ${selectedValue === option.value ? 'active' : ''}`}>
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