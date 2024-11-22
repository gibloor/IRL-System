'use client'

import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { PropsWithChildren } from 'react'

export function Providers({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}