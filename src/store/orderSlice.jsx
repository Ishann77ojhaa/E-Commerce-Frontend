import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/components/misc/statuses";
import { APIAuthenticated } from "../http";

 export const  orderSlice = createSlice({
  name: "order",

  initialState: {
    orders: [],
    status: STATUSES.IDLE,
  },

  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },

    setStatus(state, action) {
      state.status = action.payload;
    },

    clearOrders(state) {
      state.orders = [];
    },
  },
});

export const {
  setOrders,
  setStatus,
  clearOrders,
} = orderSlice.actions;

export default orderSlice.reducer;


// Get my orders
export function getMyOrders() {
  return async function getMyOrdersThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));

    try {
      const response = await APIAuthenticated.get("/order");

      dispatch(setOrders(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));

    } catch (error) {
      console.log(error.response?.data);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}