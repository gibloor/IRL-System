import React from 'react'

import styles from './styles.module.css'

interface ButtonProps {
  text: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  active?: boolean
  className?: string
  disabled?: boolean
}

const Button = (props: ButtonProps) => {
  const { text, active, onClick, className, disabled } = props

  return (
    <button
      disabled={disabled}
      className={`${styles.button}
      ${active ? styles.activeButton : null}
      ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button