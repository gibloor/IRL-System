import React, { useState } from 'react'

import Button from '@/components/Button'
import WindowTemplate from '@/components/Windows/WindowTemplate'
import Input from '@/components/Input';
import RadioGroup, { Option } from '@/components/RadioGroup';
import TimeSelector from '@/components/TimeSelector';

type TaskType = 'ongoing' | 'daily' | 'weekly'

const taskTypeOptions: Option[] = [
  {
    value: 'ongoing',
    label:'Ongoing',
  },
  {
    value: 'daily',
    label:'Daily',
  },
  {
    value: 'weekly',
    label:'Weekly',
  },
]

const priorityOptions: Option[] = [
  {
    value: '1',
    label: 'E',
  },
  {
    value: '2',
    label: 'D',
  },
  {
    value: '3',
    label: 'C',
  },
  {
    value: '4',
    label: 'B',
  },
  {
    value: '5',
    label: 'A',
  },
  {
    value: '6',
    label: 'S',
  },
  {
    value: '7',
    label: 'G',
  },
]

const weekDaysOptions: Option[] = [
  {
    value: '1',
    label: 'Mon',
  },
  {
    value: '2',
    label: 'Tue',
  },
  {
    value: '3',
    label: 'Wed',
  },
  {
    value: '4',
    label: 'Thu',
  },
  {
    value: '5',
    label: 'Fri',
  },
  {
    value: '6',
    label: 'Sat',
  },
  {
    value: '7',
    label: 'Sun',
  },
]

const AddTaskMenu = () => {
  const [taskType, setTaskType] = useState(taskTypeOptions[0].value)
  const [priority, setPriority] = useState(priorityOptions[0].value)
  const [weekDays, setWeekDays] = useState<string[]>([])

  return (
    <div>
      <div>
        <WindowTemplate
          // type="Add new quest"
          size="unlimited"
        >
          <RadioGroup
            name='tast type'
            onChange={(value) => typeof value === 'string' && setTaskType(value)}
            options={taskTypeOptions}
            label="Quest type"
          />

          <Input
            placeholder='Title'
            value=''
            onChange={() => {}}
          />
          <Input
            placeholder='Description'
            value=''
            onChange={() => {}}
          />
          <Input
            placeholder='Count'
            value=''
            onChange={() => {}}
          />
          
          {taskType === 'ongoing' ? 
            <RadioGroup
              name='priority'
              onChange={(value) => typeof value === 'string' && setPriority(value)}
              options={priorityOptions}
              label='Priority'
            /> : null
          }
          
          {taskType === 'weekly' ? 
            <RadioGroup
              name='week days'
              onChange={(value) => typeof value === 'object' && setWeekDays(value)}
              options={weekDaysOptions}
              label='Week days'
              mode='multiple'
            /> : null
          }

          {taskType === 'weekly' || taskType === 'daily' ?
            <TimeSelector
              onChange={() => {}}
              label='Preferred time'
            /> : null
          }

        </WindowTemplate>
      </div>
    </div>
  )
}

export default AddTaskMenu