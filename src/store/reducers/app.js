import { createSlice } from "@reduxjs/toolkit";
import { setHeader } from "../actions/app";
import { auth, login, logout, register } from "../actions/account";
import { getAccessToken } from "../../utils/local-storage-manager";

const initialState = {
    isAuth: Boolean(getAccessToken()),
    header: "Главная"
};

const appSlice = createSlice({
    name: "appSlice",
    initialState: initialState,
    extraReducers: {
        [auth.fulfilled]: (state, { payload: { isAuth } }) => {
            state.isAuth = isAuth;
        },
        [auth.rejected]: (state) => {
            state.isAuth = false;
        },
        [login.fulfilled]: (state, { payload: { isAuth } }) => {
            state.isAuth = isAuth;
        },
        [login.rejected]: (state) => {
            state.isAuth = false;
        },
        [logout]: (state) => {
            state.isAuth = false;
        },
        [register.fulfilled]: (state, { payload: { isAuth } }) => {
            state.isAuth = isAuth;
        },
        [register.rejected]: (state) => {
            state.isAuth = false;
        },
        [setHeader]: (state, { payload: { header } }) => {
            state.header = header;
        }
    }
});

export default appSlice.reducer;