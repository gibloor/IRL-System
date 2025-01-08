import React, { CSSProperties, DragEvent, RefObject, useEffect, useRef, useState } from 'react'

import Input from '@/components/Input';
import Button from '@/components/Button';

import styles from './styles.module.css'
import SubGoalWindow from './SubGoalWindow';

interface SubGoalsProps {
  parent: RefObject<HTMLDivElement> | null
}

interface SubGoal {
  id: string;
  goal: string;
}

const SubGoals = (props: SubGoalsProps) => {
  const { parent } = props

  const [subGoals, setSubGoals] = useState<SubGoal[]>([
    { id: '1', goal: '' },
  ]);

  // *************
  useEffect(() => {
    setSubGoals([
      { id: '1', goal: 'Waka waka' },
      { id: '2', goal: 'KAWA' },
      { id: '3', goal: '4 chipotle i bananas' },
    ])
  }, [])
  useEffect(() => {
    subGoals.length === 3 ? onSubGoalsConfirm() : null

  }, [subGoals.length])
  // **************

  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [overIndex, setOverIndex] = useState<number | null>(null)
  const [subGoalsConfirmed, setSubGoalsConfirmed] = useState(false)

  const inputRefs = useRef<HTMLDivElement[]>([])

  const handleDragStart = (e: DragEvent<HTMLDivElement>, index: number, id: string): void => {
    setDraggedId(id);
    setActiveIndex(index);
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>, index: number): void => {
    e.preventDefault();
    if (overIndex === index) return;
    
    setOverIndex(index);
    
    if (activeIndex === null) return;
    
    const newSubGoals = [...subGoals];
    const [draggedSubGoal] = newSubGoals.splice(activeIndex, 1);
    newSubGoals.splice(index, 0, draggedSubGoal);
    setSubGoals(newSubGoals);
    setActiveIndex(index);
  };

  const handleDragEnd = (): void => {
    setDraggedId(null);
    setActiveIndex(null);
    setOverIndex(null);
  };

  const handleInputChange = (id: string, value: string, index: number): void => {
    let newSubGoals = subGoals.map(subGoal => 
      subGoal.id === id ? { ...subGoal, goal: value } : subGoal
    );

    if (index === subGoals.length - 1) {
      if (value && subGoals.length < 10) {
        newSubGoals = [...newSubGoals, {
          id: (parseInt(subGoals[subGoals.length - 1].id) + 1).toString(),
          goal: ''
        }];
      }
    }
    setSubGoals(newSubGoals);
  };

  const onBlur = (subGoal: SubGoal, index: number) => {
    if (!subGoal.goal && index !== subGoals.length - 1) {
      const newSubGoals = [...subGoals];
      newSubGoals.splice(index, 1);
      setSubGoals(newSubGoals);
    }
  }

  const calculatePositions = (index: number): CSSProperties | undefined => {
    if (!parent?.current || !inputRefs.current[index]) return undefined
    
    const parentRect = parent.current.getBoundingClientRect()
    const parentWidth = parent.current.offsetWidth
    
    const subGoalWidth = 500
    const left = (parentWidth / 3 * (index - 0.5)) - (subGoalWidth / 2)
  
    const inputRect = inputRefs.current[index]!.getBoundingClientRect()
      
    return {
      '--left': `${left}px`,
      '--top': `${-(inputRect.top - parentRect.top - 175)}px`
    } as CSSProperties
  }

  const knockAudio = new Audio('setup/mainGoal/knock.mp3')

  const onSubGoalsConfirm = () => {
    setSubGoalsConfirmed(true)
    setTimeout(() => {
      knockAudio.volume = 0.125
      knockAudio.play()
    }, (subGoals.length) * 150 + 5000)
  }

  const countContentWidth = (text: string) => {
    const font = '18px Arial';
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (context) {
      context.font = font
      const width = context.measureText(text.toUpperCase()).width + 50;
      
      return width
    } else return 0
  }

  return (
    <div className={`${styles.container} ${subGoalsConfirmed ? styles.a : null}`}>
      <p className={`${styles.title} ${subGoalsConfirmed ? styles.simpleHide : null}`} >
        SUB GOALS
      </p>

      <p className={`${styles.description} ${subGoalsConfirmed ? styles.simpleHide : null}`}>
        Enter up to 10 subgoals in descending order of usefulness for the main goal
      </p>
      <div className={`${styles.inputs} ${subGoalsConfirmed ? styles.a : null}`}>
        {subGoals.map((subGoal, index) => (
          <div
            key={subGoal.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index, subGoal.id)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            ref={el => { index < 3 && el ? inputRefs.current[index] = el : null }}
            className={`
              ${styles.subGoal}
              ${draggedId === subGoal.id ? styles.dragging : ''}
              ${subGoalsConfirmed ?
                index > 2 ? styles.simpleHide : `${styles.hideBackground} ${styles.adaptAndMove}`
                : null
              }
            `}
            style={{
              transitionProperty: 'width',
              transitionDelay: `${(subGoals.length - index + 1) * 150 + 500}ms`,
              '--content-width': subGoalsConfirmed ? `${countContentWidth(subGoal.goal) + 75}px` : '0px',
              ...(subGoalsConfirmed ? {
                ...calculatePositions(index), 
                '--transition-delay': `${(subGoals.length) * 150 + 2150}ms`
              } : {})
            } as CSSProperties}
          >
            <span
              className={`${styles.numbering} ${subGoalsConfirmed ? styles.simpleHide : null}`}
              style={{ transitionDelay: `${(subGoals.length - index + 1) * 150 + 500}ms` }}
            >
              {index + 1}
            </span>
            <Input
              placeholder=''
              value={subGoal.goal}
              className={`${styles.input} ${subGoalsConfirmed && index < 3 ? `${styles.hideBackground} ${styles.scaleAndBright}` : null}`}
              wrapperClassName={`${styles.inputWrapper} ${subGoalsConfirmed && index < 3 ? styles.adaptWidth : null}`}
              onChange={(value) => handleInputChange(subGoal.id, value, index)}
              onBlur={() => onBlur(subGoal, index)}
              disabled={subGoalsConfirmed}
              style={{
                '--content-width': subGoalsConfirmed ? `${countContentWidth(subGoal.goal)}px` : '0px',
                '--transition-delay': `${(subGoals.length) * 150 + 4300}ms`
              }}
            />
          </div>
        ))}
      </div>

      <Button
        text='confirm'
        onClick={onSubGoalsConfirm}
        className={`${subGoalsConfirmed ? styles.simpleHide : null}`}
        disabled={subGoalsConfirmed}
      />


      <div className={styles.windows}>
        {subGoals.slice(0, 3).map(subGoal => 
          <SubGoalWindow
            title={subGoal.goal}
          />
        )}
      </div>
    </div>
  )
}

export default SubGoals