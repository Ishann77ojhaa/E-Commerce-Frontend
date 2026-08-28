import { createSlice } from '@reduxjs/toolkit'
import { STATUSES } from '../globals/components/misc/statuses'
import {API, APIAuthenticated} from '../http'


export const authSlice = createSlice({
  name: 'auth',

  initialState : {
    data : null,
    status : STATUSES.IDLE,
    token : localStorage.getItem("token") || "",
    email : ""
  },

  reducers: {
    setUser(state,action){
        state.data = action.payload;
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
    },
    setEmail(state,action){
       state.email = action.payload 
    }
    },
})

export const { setUser,setStatus, setToken, logout, setEmail } = authSlice.actions
export default authSlice.reducer

export function registerUser(data){
    return async function loginUserThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            const response = await API.post("/auth/register",data)
            
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
            localStorage.setItem('token', response.data.token);
            return true;

        } catch(error){
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))

            return false;
        }
    };
}

export function getMe(){
    return async function getMeThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            const response = await APIAuthenticated.get("/auth/me")
            dispatch(setUser(response.data.data))
            
            dispatch(setStatus(STATUSES.SUCCESS))
        

        } catch(error){
            console.log(error.response?.data);
            localStorage.removeItem("token");
            dispatch(logout());
        }
    };
};

export function fetchProfile(){
    return async function  fetchProfileThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            const response = await APIAuthenticated.get("profile/")
            dispatch(setUser(response.data.data))
            dispatch(setStatus(STATUSES.SUCCESS))

        } catch(error){
            dispatch(setStatus(STATUSES.ERROR))
        }
    };
}

export function ForgotPass(data){
    return async function ForgotPassThunk(dispatch){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            const response = await API.post("/auth/forgotpassword/",data)
            dispatch(setEmail(data.user_email))
            dispatch(setStatus(STATUSES.SUCCESS))
            return true;

        } catch(error){
            console.log(error)
            dispatch(setStatus(STATUSES.ERROR))

            return false;
        }
    };
}

export function VerifyOTP(data) {
    return async function VerifyOTPThunk(dispatch) {
        dispatch(setStatus(STATUSES.LOADING));

        try {
            const response = await API.post(
                "/auth/verifyotp",
                data
            );

            dispatch(setStatus(STATUSES.SUCCESS));

            return true;

        } catch (error) {
            console.log(error.response?.data || error);

            dispatch(setStatus(STATUSES.ERROR));

            return false;
        }
    };
}

export function ResetPassword(data) {

    return async function ResetPasswordThunk(dispatch) {

        dispatch(setStatus(STATUSES.LOADING));

        try {

            const response = await API.post(
                "/auth/resetpassword",
                data
            );

            dispatch(setStatus(STATUSES.SUCCESS));

            return true;

        } catch (error) {

            console.log(error.response?.data || error);

            dispatch(setStatus(STATUSES.ERROR));

            return false;
        }
    };
}

