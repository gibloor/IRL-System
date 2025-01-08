import AddTaskMenu from '@/app/(main)/AddTaskMenu';
import Button from '@/components/Button';
import React, { useState } from 'react'

import styles from './styles.module.css'

interface SubGoalWindowProps {
  title: string
}

interface ActiveTask {
  title: string;
  complited: boolean;
}

type AddTaskBarProps = {
  openMenu: () => void
  turnOnEdit: () => void
}

const AddTaskBar = (props: AddTaskBarProps) => {
  return (
    <div className={styles.add_task_bar}>
       <Button
        text='add'
        onClick={props.openMenu}
       />

       <Button
        text='change'
        onClick={props.turnOnEdit}
       />
    </div>
  )
}

const SubGoalWindow = (props: SubGoalWindowProps) => {
  const { title } = props

  const [activeTask, setActiveTask] = useState<ActiveTask>({ title: '', complited: false })

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.title}>
          {title}
        </p>

        <div>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Active Tasks</h3>
            <AddTaskMenu
              
            />
            {/* <div>
              <div className={styles.taskItem}>
                <span className={styles.taskTitle}>{activeTask.title}</span>
                <span className={activeTask.complited ? styles.statusSuccess : styles.statusFail}>
                  {activeTask.complited ? '✓' : '×'}
                </span>
              </div>
            </div>

            <AddTaskBar
              openMenu={() => {}}
              turnOnEdit={() => {}}
            /> */}
          </div>

          {/* {goal.daily_tasks.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Daily Tasks</h3>
              <div>
                {goal.daily_tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className={styles.taskItem}>
                    <span className={styles.taskTitle}>{task.title}</span>
                    <span className={styles.taskProgress}>
                      {task.progress}/{task.goal}
                    </span>
                  </div>
                ))}
              </div>

              <AddTaskBar
                openMenu={() => {}}
                turnOnEdit={() => {}}
              />
            </div>
          )} */}

          {/* {goal.weekly_tasks.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Weekly Tasks</h3>
              <div>
                {goal.weekly_tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className={styles.taskItem}>
                    <div className={styles.taskTitle}>{task.title}</div>
                    <span className={styles.taskProgress}>
                      {task.progress}/{task.goal}
                    </span>
                    <div className={styles.weeklyProgress}>
                      {task.weeklyProgress}/{task.weeklyGoal} this week
                    </div>
                  </div>
                ))}
              </div>

              <AddTaskBar
                openMenu={() => {}}
                turnOnEdit={() => {}}
              />
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default SubGoalWindow