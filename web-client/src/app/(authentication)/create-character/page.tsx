"use client"

import Input from '@/components/Input'
import NotificationTemplate from '@/components/Notifications/NotificationTemplate'
import RadioGroup from '@/components/RadioGroup'
import React, { useState } from 'react'

import styles from './styles.module.css'

const CreateCharacter = () => {
  const [gender, setGender] = useState(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);


  return (
    <div className={styles.container}>
      <NotificationTemplate
        type='create-character'
      >
        <div>
          <div 
            className={`${styles.iconWrapper} ${gender === 1 ? styles.active : ''}`}
            onClick={() => setGender(1)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="60" 
              height="60" 
              viewBox="0 0 24 24"
              className={styles.icon}
            >
              <path d="M16 2v2h3.586l-3.972 3.972c-1.54-1.231-3.489-1.972-5.614-1.972-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-2.125-.741-4.074-1.972-5.614l3.972-3.972v3.586h2v-7h-7zm-6 20c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/>
            </svg>
          </div>

          <div 
            className={`${styles.iconWrapper} ${gender === 2 ? styles.active : ''}`}
            onClick={() => setGender(2)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="60" 
              height="60" 
              viewBox="0 0 90 90"
              className={styles.icon}
            >
              <path d="M 65.896 50.433 c 11.522 -11.522 11.522 -30.27 0 -41.792 c -11.521 -11.522 -30.27 -11.522 -41.792 0 c -11.522 11.522 -11.522 30.269 0 41.792 C 29.102 55.432 35.461 58.259 42 58.92 v 12.09 H 29.485 v 6.001 H 42 V 90 H 48 V 77.012 h 12.514 v -6.001 H 48 V 58.92 C 54.539 58.259 60.898 55.432 65.896 50.433 z M 28.347 12.885 C 32.939 8.294 38.969 5.998 45 5.998 c 6.031 0 12.061 2.295 16.653 6.886 c 9.182 9.183 9.182 24.123 0 33.306 c -9.183 9.182 -24.124 9.181 -33.305 0 C 19.165 37.008 19.165 22.067 28.347 12.885 z"/>
            </svg>
          </div>
        </div>

        <Input
          placeholder="Character name"  
          value={name} 
          onChange={(val) => setName(val)} 
        />

        <Input 
          placeholder="Level (age)" 
          type="number" 
          value={age} 
          onChange={(val) => setAge(Number(val))} 
        />

        Выбор класса, radio Group но ещё c картинкой.
        Программист, Горничная, и заблоченный художник типо comming soon

        Выбранный класс влияет на прогрмму обучения.
        Естественно есть подклассы.
        Ранг в том или ином субсубклассе.

        физические характеристики |
        Какие гантельки можешь 10 раз по 3 подхода бахнуть (16 = 10) \ 3
        Количество отжиманий по 3 подхода. (20 - 10) \ 3
        какую дистанцию способен пробежать на скорости 12км\ч (2 = 10) \ 3
        <div>
          <RadioGroup
            name=''
            onChange={() => {}}
            options={[
              { value: '2', label: '2km' },
              { value: '5', label: '5km' },
            ]}
          />
        </div>
        


        Уровень персонажа

        Таблица с параметрами.

        Сила
        Выносливость

        Список навыков и их уровень
      </NotificationTemplate>
    </div>
  )
}

export default CreateCharacter