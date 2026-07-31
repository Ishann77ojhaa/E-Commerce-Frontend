import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { STATUSES } from '../globals/components/misc/statuses'
import API from '../http'

export const productSlice = createSlice({
  name: 'product',
  initialState : {
    data : [],
    status : STATUSES.SUCCESS,
    selectedProduct : {}
  },

  reducers: {
    setProducts(state,action){
        state.data = action.payload
       },
       setStatus(state,action){
        state.status = action.payload
       },
       setselectedProduct(state, action){
        state.selectedProduct = action.payload
       }
    },

    extraReducers : (builder) =>{
        builder
        .addCase(fetchProducts.pending,(state,action)=>{
            state.status = STATUSES.LOADING
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.data = action.payload 
            state.status = STATUSES.SUCCESS
        })
        .addCase(fetchProducts.rejected,(state,action)=>{
            state.status = STATUSES.ERROR
        })
    }
    
    // add: (state, action) => {
    //   state.push(action.payload)
    // },
    // remove: (state, action) => {
    //   return state.filter((item)=>item._id !== action.payload);
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
//   },
})

export const { setProducts,setStatus, setselectedProduct } = productSlice.actions

export default productSlice.reducer


//all products aysnc fetch
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async () => {
    try {
      const response = await API.get("/product");
      const data = response.data.data;
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);


//single product aync fetch
export function fetchProductDetails(productId){
    return async function fetchProductDetailsThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try {
          const response = await API.get(`/product/${productId}`)
          dispatch(setselectedProduct(response.data.data))
          dispatch(setStatus(STATUSES.SUCCESS))
        } catch (error) {
           console.log(error)
           dispatch(setStatus(STATUSES.ERROR)) 
        }
    }
}