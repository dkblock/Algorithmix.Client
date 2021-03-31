import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault } from "./defaults";
import { authenticate, login, logout, register } from "../actions/account";
import { getAccessToken } from "../../utils/local-storage-manager";

const initialState = {
    currentUser: {},
    isAuthenticated: Boolean(getAccessToken()),
    isFetching: true,
    hasError: false
};

const accountSlice = createSlice({
    name: "accountSlice",
    initialState: initialState,
    extraReducers: {
        [authenticate.pending]: (state) => {
            onPendingDefault(state);
        },
        [authenticate.fulfilled]: (state, { payload }) => {
            onFulfilled(state, payload);
        },
        [authenticate.rejected]: (state) => {
            onRejected(state);
        },

        [login.pending]: (state) => {
            onPendingDefault(state);
        },
        [login.fulfilled]: (state, { payload }) => {
            onFulfilled(state, payload);
        },
        [login.rejected]: (state) => {
            onRejected(state);
        },

        [logout.fulfilled]: (state) => {
            onFulfilledDefault(state);
            state.currentUser = {};
            state.isAuthenticated = false;
        },

        [register.pending]: (state) => {
            onPendingDefault(state);
        },
        [register.fulfilled]: (state, { payload }) => {
            onFulfilled(state, payload);
        },
        [register.rejected]: (state) => {
            onRejected(state);
        }
    }
});

const onFulfilled = (state, { currentUser, isAuthenticated }) => {
    onFulfilledDefault(state, isAuthenticated);
    state.currentUser = currentUser;
    state.isAuthenticated = isAuthenticated;
};

const onRejected = (state) => {
    onRejectedDefault(state);
    state.currentUser = {};
    state.isAuthenticated = false;
};

export default accountSlice.reducer;