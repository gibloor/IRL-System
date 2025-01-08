'use client'

import React, { useRef, useState } from 'react'

import WindowTemplate from '@/components/Windows/WindowTemplate'
import MainGoal from './MainGoal'

import styles from './styles.module.css'
import SubGoals from './SubGoals'

const Setup = () => {
  const [mainGoal, setMainGoal] = useState('')

  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.setup}>
      <div className={styles.container} ref={parentRef}>
        <WindowTemplate size='unlimited'>
          {/* <MainGoal
            setMainGoal={setMainGoal}
            parent={parentRef}
          />
          {mainGoal ?
            <SubGoals
              parent={parentRef}
            /> : null
          } */}

            <SubGoals
              parent={parentRef}
            />
        </WindowTemplate>
      </div>
    </div>
  )
}

export default Setup