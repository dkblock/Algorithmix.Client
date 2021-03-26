import { createSlice } from "@reduxjs/toolkit";
import { createTest, fetchTests } from "../actions/tests";

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
        [fetchTests.fulfilled]: (state, { payload: { tests, hasError } }) => {
            state.isFetching = false;
            state.tests = tests;
            state.hasError = hasError;
        },
        [fetchTests.rejected]: (state) => {
            state.isFetching = false;
            state.tests = [];
            state.hasError = true;
        },
        [createTest.pending]: (state) => {
            state.isFetching = true;
        },
        [createTest.fulfilled]: (state, { payload: { test, hasError } }) => {
            if (Boolean(test))
                state.tests = [test, ...state.tests];

            state.isFetching = false;
            state.hasError = hasError;
        },
        [createTest.rejected]: (state) => {
            state.isFetching = false;
            state.hasError = true;
        }
    }
});

export default testsSlice.reducer;