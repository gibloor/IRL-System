import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { User } from '../sagas/authSaga';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true
      state.error = null
    },
    authSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false
      state.user = action.payload
      state.error = null
    },
    authFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
      state.user = null
    },
    signOut: (state) => {
      state.user = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload.auth,
      }
    })
  }
})

export const {
  authStart,
  authSuccess,
  authFailure,
  signOut
} = authSlice.actions