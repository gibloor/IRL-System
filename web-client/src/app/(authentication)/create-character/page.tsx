"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Input from '@/components/Input'
import NotificationTemplate from '@/components/Notifications/NotificationTemplate'
import RadioGroup from '@/components/RadioGroup'
import StatProgressBar from '@/components/StatProgressBar'
import Button from '@/components/Button'
import ProgrammerIcon from './classIcons/Programmer'
import { BACKEND_URL } from '@/variables/backend'
import { useAuth } from '@/redux/sagas/authSaga'

import styles from './styles.module.css'

const MALE = 'male'
const FEMALE = 'female'

const CreateCharacter = () => {
  const [gender, setGender] = useState<'male' | 'female'>(MALE);
  const [name, setName] = useState('');
  const [age, setAge] = useState(25);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(50);
  const [stamina, setStamina] = useState(120);
  const [runDistance, setRunDistance] = useState('0');
  const [dumbbellWeight, setDumbbellWeight] = useState('0');
  const [selectedClass, setSelectedClass] = useState('custom');

  const auth = useAuth()

  const characterClasses = [
    { 
      value: 'custom', 
      label: 'Custom', 
      icon: <ProgrammerIcon /> 
    },
    { 
      value: 'programmer', 
      label: 'Programmer', 
      icon: <ProgrammerIcon /> 
    },
    { 
      value: 'artist', 
      label: 'Artist', 
      disabled: true,
      disabledReason: 'Coming Soon',
      icon: <ProgrammerIcon />
    }
  ];

  const recalculateStat = (genderModifier: number, ageModifier: number, exercise: number) =>
    Number((exercise * (2 - genderModifier) * (2 - ageModifier)).toFixed(1))

  useEffect(() => {
    const genderModifier = gender === 'male' ? 1 : 0.8
    const ageModifier = age <= 35 ? 1 : age <= 50 ? 0.8 : 0.6
    const distance = Number(runDistance)

    const distanceValue =
      distance == 0 ? 5 :
      distance <= 2 ? distance / 2 * 10 :
      distance <= 10 ? 10 + (distance - 2) * 11.25 : distance * 10

    setStamina(recalculateStat(genderModifier, ageModifier, distanceValue))
  }, [age, gender, runDistance])

  useEffect(() => {
    const genderModifier = gender === 'male' ? 1 : 0.6
    const ageModifier = age <= 35 ? 1 : age <= 50 ? 0.8 : 0.6
    const weight = Number(dumbbellWeight)

    const weightValue =
      weight == 0 ? 5 :
      weight <= 16 ? weight * 0.625 :
      weight <= 32 ? 10 + (weight - 17) * 6 : 100 + (weight - 32) * 5

    setStrength(recalculateStat(genderModifier, ageModifier, weightValue))
  }, [age, gender, dumbbellWeight])

  const onCreate = async () => {
    auth.signUp({
      username: name,
      age,
      gender,
      runDistance,
      dumbbellWeight,
      selectedClass,
      email,
      password
    })
  }
  
  return (
    <div className={styles.container}>
      <NotificationTemplate
        type='create-character'
        className={styles.template}
      >
        <div className={styles.baseInfo}>
          <div className={styles.genders}>
            <div 
              className={`icon-wrapper ${gender === 'male' ? 'active' : ''}`}
              onClick={() => setGender(MALE)}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="60" 
                height="60" 
                viewBox="0 0 24 24"
                className='icon'
              >
                <path d="M16 2v2h3.586l-3.972 3.972c-1.54-1.231-3.489-1.972-5.614-1.972-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-2.125-.741-4.074-1.972-5.614l3.972-3.972v3.586h2v-7h-7zm-6 20c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
              </svg>
            </div>

            <div 
              className={`icon-wrapper ${gender === 'female' ? 'active' : ''}`}
              onClick={() => setGender(FEMALE)}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="60" 
                height="60" 
                viewBox="0 0 90 90"
                className='icon'
              >
                <path d="M 65.896 50.433 c 11.522 -11.522 11.522 -30.27 0 -41.792 c -11.521 -11.522 -30.27 -11.522 -41.792 0 c -11.522 11.522 -11.522 30.269 0 41.792 C 29.102 55.432 35.461 58.259 42 58.92 v 12.09 H 29.485 v 6.001 H 42 V 90 H 48 V 77.012 h 12.514 v -6.001 H 48 V 58.92 C 54.539 58.259 60.898 55.432 65.896 50.433 z M 28.347 12.885 C 32.939 8.294 38.969 5.998 45 5.998 c 6.031 0 12.061 2.295 16.653 6.886 c 9.182 9.183 9.182 24.123 0 33.306 c -9.183 9.182 -24.124 9.181 -33.305 0 C 19.165 37.008 19.165 22.067 28.347 12.885 z"/>
              </svg>
            </div>
          </div>

          <div className={styles.inputs}>
            <Input
              placeholder="x_Chiros227_x"  
              value={name} 
              onChange={(val) => setName(val)}
              label="Nickname"
              width={200}
            />

            <Input 
              placeholder="Level (age)" 
              type="number" 
              value={age} 
              onChange={(val) => setAge(Number(val))} 
              label="Level (age)"
              width={125}
            />

            
            <Input 
              placeholder="bananas@gmail.com"
              value={email} 
              onChange={(val) => setEmail(val)} 
              label="Email"
            />

            <Input 
              placeholder="Pochita2COOL"
              value={password} 
              onChange={(val) => setPassword(val)} 
              label="Password"
            />
          </div>
        </div>

        <RadioGroup
          name=''
          onChange={(value) => setSelectedClass(value)}
          options={characterClasses}
          className={styles.classesContainer}
          label='Class'
        />

        <RadioGroup
          name=''
          onChange={(value) => setRunDistance(value)}
          options={[
            { value: '0', label: 'don\'t know'},
            { value: '1', label: '1km' },
            { value: '2', label: '2km' },
            { value: '3', label: '3km' },
            { value: '4', label: '4km' },
            { value: '5', label: '5km' },
            { value: '10', label: '10km' },
          ]}
          label='Max distance at 12km/h'
        />
        
        <RadioGroup
          name=''
          onChange={(value) => setDumbbellWeight(value)}
          options={[
            { value: '0', label: 'don\'t know'},
            { value: '10', label: '10kg' },
            { value: '12', label: '12kg' },
            { value: '14', label: '14kg' },
            { value: '16', label: '16kg' },
            { value: '32', label: '32kg' },
          ]}
          label='Dumbbell weight (3×10)'
        />

        <StatProgressBar
          label="Stamina"
          value={stamina}
        />
        <StatProgressBar
          label="Strength"
          value={strength}
        />

        {/* skills */}

        <Button
          text='Create'
          onClick={() => onCreate()}
        />
      </NotificationTemplate>
    </div>
  )
}

export default CreateCharacter