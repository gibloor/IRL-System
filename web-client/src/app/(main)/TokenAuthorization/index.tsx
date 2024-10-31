"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import ChoiceNotification from '@/components/Notifications/ChoiceNotification'
import styles from './styles.module.css'

const TokenAuthorization = () => {
  const [showWarning, setShowWarning] = useState(false)

  const router = useRouter()
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    const response = {data: false} //axios.post('')

    if (response.data) {

    } else {
      setShowWarning(true)
    }
    
  }, [])
  

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

export default TokenAuthorization