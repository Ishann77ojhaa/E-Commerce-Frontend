import { createSlice } from "@reduxjs/toolkit";
import API from "../../api/API";
import { STATUSES } from "../../globals/constants/status";

const profileSlice = createSlice({
    name: "profile",

    initialState: {
        data: null,
        status: STATUSES.IDLE,
    },

    reducers: {
        setProfile(state, action) {
            state.data = action.payload;
        },

        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const {
    setProfile,
    setStatus,
} = profileSlice.actions;

export default profileSlice.reducer;

export function getMyProfile() {
    return async function getMyProfileThunk(dispatch) {

        dispatch(setStatus(STATUSES.LOADING));

        try {

            const response = await API.get("/profile");

            dispatch(setProfile(response.data.data));
            dispatch(setStatus(STATUSES.SUCCESS));

        } catch (error) {

            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));

        }
    };
}

export function updateMyProfile(data) {
    return async function updateMyProfileThunk(dispatch) {

        dispatch(setStatus(STATUSES.LOADING));

        try {

            const response = await API.put("/profile", data);

            dispatch(setProfile(response.data.data));
            dispatch(setStatus(STATUSES.SUCCESS));

            return true;

        } catch (error) {

            console.log(error);
            dispatch(setStatus(STATUSES.ERROR));

            return false;
        }
    };
}