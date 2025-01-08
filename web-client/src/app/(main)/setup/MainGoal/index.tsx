import React, { RefObject, useEffect, useRef, useState } from 'react'

import TextParticles from '@/components/TextToParticles'
import Button from '@/components/Button'
import Input from '@/components/Input'

import styles from './styles.module.css'

type MainGoalProps = {
  setMainGoal: (goal: string) => void
  parent: RefObject<HTMLDivElement> | null
}

const MainGoal = (props: MainGoalProps) => {
  const { setMainGoal, parent } = props

  const [mainGoalInput, setMainGoalInput] = useState('')
  const [hide, setHide] = useState(false)
  const [distanceToTop, setDistanceToTop] = useState(0)
  const [contentWidth, setContentWidth] = useState(0)
  const [isAbsolute, setIsAbsolute] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  
  const knockAudio = new Audio('setup/mainGoal/knock.mp3')

  const countContentWidth = () => {
    if (inputRef.current) {
      const styles = window.getComputedStyle(inputRef.current);
      const font = styles.font;
      const text = inputRef.current.value.toUpperCase();
      
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (context) {
        context.font = font

        const width = context.measureText(text).width;
        setContentWidth(width + 50);
      }
    }
  }

  const onAcceptMainGoal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    countContentWidth()
    setHide(true)
    setTimeout(() => {
      knockAudio.volume = 0.125
      knockAudio.play()
    }, 4900)
    setTimeout(() => {
      setMainGoal(mainGoalInput)
      setIsAbsolute(true)
    }, 5100)
  }

  useEffect(() => {
    if (parent?.current && inputRef.current) {
      const parentRect = parent.current.getBoundingClientRect()
      const textRect = inputRef.current.getBoundingClientRect()
      setDistanceToTop(textRect.top - parentRect.top - 50)
    }
  }, [inputRef, parent])

  return (
    <form className={`${styles.container} ${isAbsolute ? styles.absoluteForm : null}`}>
      <div className={styles.title}>
        <TextParticles 
          text="MAIN GOAL" 
          fontSize={60}
          color="white"
          show={!hide}
        />
      </div>

      <Input
        inputRef={inputRef}
        placeholder='Become a moneybag'
        value={mainGoalInput}
        onChange={setMainGoalInput}
        className={`${styles.input} ${isAbsolute ? styles.absoluteInput : hide ? styles.move_input : null}`}
        wrapperClassName={`${isAbsolute ? styles.absoluteWrapper : hide ? styles.adaptWidth : styles.inputWrapper}`}
        style={{ '--distance-to-top': `${distanceToTop}px`, '--content-width': `${contentWidth}px` }}
        disabled={hide}
      />
      
      <Button
        text='confirm'
        onClick={onAcceptMainGoal}
        className={`${styles.button} ${hide ? styles.hideButton : null}`}
      />
    </form>
  )
}

export default MainGoal