import { createSlice } from '@reduxjs/toolkit'



export const cartSlice = createSlice({
  name: 'cart',
  initialState : [],
  reducers: {
    add: (state, action) => {
    const item = state.find(
        (product) => product._id === action.payload._id
    );

    if (!item) {
        state.push({
            ...action.payload,
            quantity: 1,
        });
    }
},
    remove: (state, action) => {
      return state.filter((item)=>item._id !== action.payload);
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { add, remove } = cartSlice.actions

export default cartSlice.reducer
