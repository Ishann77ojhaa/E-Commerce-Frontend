import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../globals/components/misc/statuses";
import { APIAuthenticated } from "../http";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: STATUSES.SUCCESS,
  },
  reducers: {
    setItem: (state, action) => {
      state.items = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setItem, setStatus } = cartSlice.actions;
export default cartSlice.reducer;

//async api call to add to cart
export function addToCart(productId) {
  return async function addToCartThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.post(`/cart/${productId}`);
      dispatch(setItem(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error.response?.data);
      console.log(error.response?.status);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

//async api call to fetch cart tems
export function fetchCart() {
  return async function fetchCartThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.get(`/cart`);
      dispatch(setItem(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

//async api call to Increase Quantity from cart tems
export function increaseQuantity(productId) {
  return async function increaseQuantityThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const response = await APIAuthenticated.patch(
        `/cart/${productId}/increase`,
      );
      dispatch(setItem(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

//async api call to Decrease Quantity from cart tems
export function decreaseQuantity(productId) {
  return async function decreaseQuantityThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));

    try {
      const response = await APIAuthenticated.patch(
        `/cart/${productId}/decrease`,
      );

      dispatch(setItem(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}


//async api call to Delete item from cart tems
export function deleteProductFromCart(productId) {
  return async function deleteProductFromCartThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));

    try {
      const response = await APIAuthenticated.delete(
        `/cart/${productId}`,
      );

      dispatch(setItem(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log(error);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}