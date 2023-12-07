import { createSlice } from '@reduxjs/toolkit'
import {jwtDecode} from 'jwt-decode'

const initialState = {
    user: null
}

if(localStorage.getItem('token')){
    const dToken = jwtDecode(localStorage.getItem('token'))
    console.log(dToken)
    if(dToken.exp * 1000 < Date.now()){
        localStorage.removeItem('token')
    }else{
        initialState.user = dToken;
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      login: (state, action) => {
        localStorage.setItem('token', action.payload.token)
        state.user = action.payload
      },
      logout: (state) => {
        localStorage.removeItem('token')
        state.user = null
      },
    },
  })
  
  // Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions
  
export default authSlice.reducer