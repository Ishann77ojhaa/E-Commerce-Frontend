import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const STATUSES = Object.freeze({
    SUCCESS : 'success',
    ERROR : 'error',
    LOADING : 'loading'
})

export const productSlice = createSlice({
  name: 'product',
  initialState : {
    data : [],
    status : STATUSES.SUCCESS
  },

  reducers: {
    setProducts(state,action){
        state.data = action.payload
       },
       setStatus(state,action){
        state.status = action.payload
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

export const { setProducts,setStatus } = productSlice.actions

export default productSlice.reducer

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/product");
      const data = response.data.data;
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

// export function fetchProducts(){
//     return async function fetchProductThunk(dispatch){
//         dispatch(setStatus(STATUSES.LOADING))
//         try {
//           const response = await axios.get("http://localhost:2000/api/products")
//           dispatch(setProducts(response.data.data))
//           dispatch(setStatus(STATUSES.SUCCESS))
//         } catch (error) {
//            console.log(error)
//            dispatch(setStatus(STATUSES.ERROR)) 
//         }
//     }
// }