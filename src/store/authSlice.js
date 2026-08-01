import { createSlice } from '@reduxjs/toolkit'
import { STATUSES } from '../globals/components/misc/statuses'
import axios from 'axios'
import API from '../http'


export const authSlice = createSlice({
  name: 'auth',
  initialState : {
    data : null,
    status : STATUSES.IDLE,
    token : ""
  },

  reducers: {
    setUser(state,action){
        state.data = action.payload
       },
       setStatus(state,action){
        state.status = action.payload
       },
       setToken(state,action){
        state.token = action.payload
       },
       logout(state) {
        state.data = null;
        state.token = "";
        localStorage.removeItem("token");
    }
    },
})

export const { setUser,setStatus, setToken, logout } = authSlice.actions
export default authSlice.reducer

export function registerUser(data){
    return async function loginUserThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            const response = await axios.post("http://localhost:2000/api/auth/register",data)
            
            dispatch(setStatus(STATUSES.SUCCESS))
        } catch(error){
          console.log(error)
          dispatch(setStatus(STATUSES.ERROR))
        }
    }
}

export function loginUser(data){
    return async function loginUserThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            const response = await API.post("/auth/login",data)
            dispatch(setUser(response.data.data))
            dispatch(setToken(response.data.token))
            dispatch(setStatus(STATUSES.SUCCESS))
            localStorage.setItem('token', response.data.token)
        } catch(error){
          console.log(error)
          dispatch(setStatus(STATUSES.ERROR))
        }
    }
}
