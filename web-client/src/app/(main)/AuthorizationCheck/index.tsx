"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'

import ChoiceNotification from '@/components/Notifications/ChoiceNotification'

import styles from './styles.module.css'
import { selectAuth, selectUser } from '@/redux/selectors/authSelectors'

const AuthorizationCheck = () => {
  const authorization = useSelector(selectAuth)
  const [showWarning, setShowWarning] = useState(false)

  const router = useRouter()
  
  useEffect(() => {
    if (!authorization.loading) {
      console.log(authorization)
      setShowWarning(!authorization.user)
    }
  }, [authorization.user, authorization.loading])

  return (
    showWarning ?
      <div className={styles.container}>
        <ChoiceNotification
          text='unauthorized player'
          type='warning'
          firstOption={() => router.push('/create-character')}
          secondOption={() => router.push('/authorize')}
          authMod
        />
      </div> : <></>
  )
}

export default AuthorizationCheck