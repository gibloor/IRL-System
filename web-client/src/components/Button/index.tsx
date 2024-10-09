import React from 'react'

import styles from './styles.module.css'

interface ButtonProps {
  text: string
  onClick: () => void
}

const Button = (props: ButtonProps) => {
  const { text, onClick } = props

  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button