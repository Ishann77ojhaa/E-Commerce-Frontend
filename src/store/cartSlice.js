import { createSlice } from '@reduxjs/toolkit'



export const cartSlice = createSlice({
  name: 'cart',
  initialState : [],
  reducers: {
    add: (state, action) => {
      state.push(action.payload)
    },
    remove: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { add  } = cartSlice.actions

export default cartSlice.reducer