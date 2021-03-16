import { createSlice } from "@reduxjs/toolkit";
import { fetchTests } from "../actions/tests";

const initialState = {
    tests: [],
    isFetching: false,
    hasError: false
};

const testsSlice = createSlice({
    name: "testsSlice",
    initialState: initialState,
    extraReducers: {
        [fetchTests.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchTests.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.tests = action.payload.tests;
            state.hasError = action.payload.hasError;
        },
        [fetchTests.rejected]: (state) => {
            state.isFetching = false;
            state.tests = [];
            state.hasError = true;
        }
    }
});

export default testsSlice.reducer;