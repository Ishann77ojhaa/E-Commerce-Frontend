import { createSlice } from '@reduxjs/toolkit'
import { STATUSES } from '../globals/components/misc/statuses'
import {APIAuthenticated} from '../http'

export const checkOutSlice = createSlice({
  name: 'checkout',
  initialState : {
    data : null,
    status : STATUSES.IDLE,
  },

  reducers: {
    setOrder(state,action){
        state.data = action.payload
       },
       setStatus(state,action){
        state.status = action.payload
},
},
});

export const { setOrder,setStatus} = checkOutSlice.actions

export default checkOutSlice.reducer


//all products aysnc fetch
export function createOrder(data) {
  return async function createOrderThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.post(
        "/order", data);
      dispatch(setOrder(response.data.data))
      dispatch(setStatus(STATUSES.SUCCESS));
      return response.data.data;
    } catch (error) {
      console.log(error.message);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

//khalti initiate
export function initiateKhalti(orderId, amount) {
  return async function (dispatch) {
    try {
      const response = await APIAuthenticated.post(
        "/payment",
        {
          orderId,
          amount,
        }
      );
      window.location.href = response.data.payment_url;
    } catch (error) {
      console.log(error.response?.data);
    }
  };
}