import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import productReducer from './productSlice'
import  authReducer  from './authSlice'
import { checkOutSlice } from './checkOutSlice'
import orderReducer from './orderSlice'

export const store = configureStore({
  reducer: {
    cart : cartReducer,
    product : productReducer,
    auth : authReducer,
    checkOut : checkOutSlice,
    order: orderReducer
  },
})