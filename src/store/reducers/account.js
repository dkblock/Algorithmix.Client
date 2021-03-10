import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "../actions/account";

const initialState = {
    currentUser: {},
    isFetching: false
};

const accountSlice = createSlice({
    name: "accountSlice",
    initialState: initialState,
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.currentUser = action.payload.currentUser;
        },
        [logout]: (state) => {
            state.currentUser = {};
        },
        [register.fulfilled]: (state, action) => {
            state.currentUser = action.payload.currentUser;
        }
    }
});

export default accountSlice.reducer;