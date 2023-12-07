import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth.reducer'
import cartReducer from './cart.reducer'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
})