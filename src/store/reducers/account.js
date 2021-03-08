import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../actions/account";

const initialState = {
    currentUser: {},
    isFetching: false
};

const accountSlice = createSlice({
    name: "accountSlice",
    initialState: initialState,
    extraReducers: {
        [logout]: (state) => {
            state.currentUser = {};
        }
    }
});

export default accountSlice.reducer;