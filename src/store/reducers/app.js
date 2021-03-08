import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "../actions/account";
import { getAccessToken } from "../../utils/local-storage-manager";

const initialState = {
    isAuth: !!getAccessToken(),
    header: "Главная"
};

const appSlice = createSlice({
    name: "appSlice",
    initialState: initialState,
    extraReducers: {
        [login.fulfilled]: (state) => {
            state.isAuth = true;
        },
        [login.rejected]: (state) => {
            state.isAuth = false;
        },
        [logout]: (state) => {
            state.isAuth = false;
        },
        [register.fulfilled]: (state) => {
            state.isAuth = true;
        },
        [register.rejected]: (state) => {
            state.isAuth = false;
        }
    }
});

export default appSlice.reducer;