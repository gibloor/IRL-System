import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { authSlice } from './reducers/authSlice'
import { watchAuth } from './sagas/authSaga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(watchAuth)

export type RootState = ReturnType<typeof store['getState']>
export type AppDispatch = typeof store['dispatch']