import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/components/misc/statuses";
import { APIAuthenticated } from "../http";

 export const  orderSlice = createSlice({
  name: "order",

  initialState: {
    orders: [],
    selectedOrder: null,
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

    setSelectedOrder(state, action) {
  state.selectedOrder = action.payload;
},
updateOrderStatus(state, action) {
  const { orderId, status } = action.payload;

  const order = state.orders.find(
    (order) => order._id === orderId
  );

  if (order) {
    order.Order_Status = status;
  }
},
  },
});

export const {
  setOrders,
  setStatus,
  clearOrders,
  setSelectedOrder,
  updateOrderStatus
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

//get single order
export function getOrderById(id) {
  return async function getOrderByIdThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));

    try {
      const response = await APIAuthenticated.get(`/order/${id}`);

      dispatch(setSelectedOrder(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));

      return true;
    } catch (error) {
      console.log(error.response?.data || error);

      dispatch(setStatus(STATUSES.ERROR));

      return false;
    }
  };
}


//Update Order
export const updateOrder = (orderId, shippingAddress) => async (dispatch) => {
    try {
        const response = await APIAuthenticated.patch(
            `/order/${orderId}`,
            {
                shipping_address: shippingAddress
            }
        );

        dispatch(setSelectedOrder(response.data.data));

        return response.data;
    } catch (error) {
        console.log(
            "UPDATE ORDER ERROR:",
            error.response?.data || error.message
        );

        throw error;
    }
};

//Cancel Order
export function cancelOrder(orderId) {
  return async function cancelOrderThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));

    try {
      const response = await APIAuthenticated.patch(
        `/order/cancel/${orderId}`
      );

      dispatch(setSelectedOrder(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));

      return true;
    } catch (error) {
      console.log(error.response?.data || error);

      dispatch(setStatus(STATUSES.ERROR));

      return false;
    }
  };
}