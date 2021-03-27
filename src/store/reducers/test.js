import { createSlice } from "@reduxjs/toolkit";
import { createTest, fetchTests, selectTest } from "../actions/test";

const initialState = {
    tests: [],
    selectedTest: null,
    isFetching: false,
    hasError: false
};

const testSlice = createSlice({
    name: "testSlice",
    initialState: initialState,
    extraReducers: {
        [fetchTests.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchTests.fulfilled]: (state, { payload: { tests, hasError } }) => {
            state.isFetching = false;
            state.tests = tests;
            state.hasError = hasError;

            if (!state.selectedTest)
                state.selectedTest = tests[0];
        },
        [fetchTests.rejected]: (state) => {
            state.isFetching = false;
            state.tests = [];
            state.selectedTest = null;
            state.hasError = true;
        },
        [createTest.pending]: (state) => {
            state.isFetching = true;
        },
        [createTest.fulfilled]: (state, { payload: { test, hasError } }) => {
            if (Boolean(test)) {
                state.tests = [test, ...state.tests];
                state.selectedTest = test;
            }

            state.isFetching = false;
            state.hasError = hasError;
        },
        [createTest.rejected]: (state) => {
            state.isFetching = false;
            state.hasError = true;
        },
        [selectTest]: (state, { payload }) => {
            state.selectedTest = payload.test;
        }
    }
});

export default testSlice.reducer;