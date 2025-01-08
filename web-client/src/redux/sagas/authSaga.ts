import { BACKEND_URL } from '@/variables/backend';
import axios, { AxiosResponse } from 'axios';
import { useDispatch } from 'react-redux';
import { call, put, takeLatest } from 'redux-saga/effects'
import { authStart, authSuccess, authFailure, signOut } from '../reducers/authSlice'

export interface User {
  id: string;
  gender: 'male' | 'female';
  name: string;
  age: number;
  runDistance: string;
  dumbbellWeight: string;
  selectedClass: string;
}

export interface AuthProps {
  user: User;
  token: string;
}

interface SignInPayload {
  username: string;
  password: string;
}

interface SignUpPayload extends Omit<User, 'id' | 'name'> {
  email: string;
  password: string;
  username: string;
}

export const AUTH_SIGN_IN = 'auth/signIn'
export const AUTH_SIGN_UP = 'auth/signUp'
export const AUTH_CHECK = 'auth/check'
export const AUTH_SIGN_OUT = 'auth/signOut'

type AuthAction = 
  | { type: typeof AUTH_SIGN_IN; payload: SignInPayload }
  | { type: typeof AUTH_SIGN_UP; payload: SignUpPayload }
  | { type: typeof AUTH_CHECK }
  | { type: typeof AUTH_SIGN_OUT }

function* authSaga(action: AuthAction): Generator<any, void, AxiosResponse<AuthProps>>  {
  if (action.type === AUTH_SIGN_OUT) {
    try {
      localStorage.removeItem('token')
    } catch (err: any) {
      console.error(err)
    }
    return
  }

  yield put(authStart())

  try {
    let authProps: AuthProps

    switch (action.type) {
      case AUTH_SIGN_IN:
        const signInResponse = yield call(axios.post, `${BACKEND_URL}/authorization/sign-in`, action.payload)
        authProps = signInResponse.data
        break
      case AUTH_SIGN_UP:
        const signUpResponse = yield call(axios.post, `${BACKEND_URL}/authorization/sign-up`, action.payload)
        authProps = signUpResponse.data
        break
      case AUTH_CHECK:
        const token = localStorage.getItem('token')
        if (!token) throw new Error('No token')
        const checkResponse = yield call(axios.get, `${BACKEND_URL}/authorization/token-verify`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        authProps = checkResponse.data
        break
      default:
        throw new Error('Unknown action type')
    }

    localStorage.setItem('token', authProps.token)
    yield put(authSuccess(authProps.user))
  } catch (error) {
    yield put(authFailure(error instanceof Error ? error.message : 'Unknown error'))
  }
}

export function* watchAuth() {
  yield takeLatest<AuthAction>(
    [AUTH_SIGN_IN, AUTH_SIGN_UP, AUTH_CHECK, AUTH_SIGN_OUT], 
    authSaga
  )
}

export const useAuth = () => {
  const dispatch = useDispatch()
  
  return {
    signIn: (data: SignInPayload) => 
      dispatch({ type: AUTH_SIGN_IN, payload: data }),
    
    signUp: (data: SignUpPayload) =>
      dispatch({ type: AUTH_SIGN_UP, payload: data }),
    
    checkAuth: () => 
      dispatch({ type: AUTH_CHECK }),
      
    signOut: () => 
      dispatch({ type: AUTH_SIGN_OUT })
  }
}