"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import Input from '@/components/Input'
import NotificationTemplate from '@/components/Windows/WindowTemplate'
import Button from '@/components/Button'
import { useAuth } from '@/redux/sagas/authSaga'

import styles from './styles.module.css'
import { selectUser } from '@/redux/selectors/authSelectors'
import { useSelector } from 'react-redux'

const Authorize = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth()
  const router = useRouter()

  const user = useSelector(selectUser)

  const onAuthorize = async () => {
    auth.signIn({ username: name, password})
    if (user) {
      router.push('/')  
    }
  }

  return (
    <div className={styles.container}>
      <NotificationTemplate
        type='authorize'
        className={styles.template}
      >
        <div className={styles.block}>
          <div className={styles.inputs}>
            <Input 
              placeholder="x_Chiros227_x"
              value={name} 
              onChange={(val) => setName(val)} 
              label="Nickname"
            />

            <Input 
              placeholder="Pochita2COOL"
              value={password} 
              onChange={(val) => setPassword(val)} 
              label="Password"
            />
          </div>

          <Button
            text='Authorize'
            onClick={() => onAuthorize()}
          />
        </div>
      </NotificationTemplate>
    </div>
  )
}


export default Authorize