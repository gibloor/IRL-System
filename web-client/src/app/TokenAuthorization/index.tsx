"use client"

import React, { useEffect } from 'react'

import { useAuth } from '@/redux/sagas/authSaga'

const TokenAuthorization = () => {
  const auth = useAuth()
  useEffect(() => {
    auth.checkAuth()  
  }, [])
  
  return <></>
}

export default TokenAuthorization