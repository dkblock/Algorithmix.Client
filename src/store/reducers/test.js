import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault } from "./defaults";
import { createTest, deleteTest, fetchTest, fetchTests, selectTest } from "../actions/test";

const initialState = {
    tests: [],
    selectedTest: null,
    isFetching: false,
    hasUnsavedChanges: false,
    hasError: false
};

const testSlice = createSlice({
    name: "testSlice",
    initialState: initialState,
    extraReducers: {
        [fetchTests.pending]: (state) => {
            onPendingDefault(state);
        },
        [fetchTests.fulfilled]: (state, { payload: { tests, hasError } }) => {
            onFulfilledDefault(state, hasError);
            state.tests = tests;

            if (!state.selectedTest)
                state.selectedTest = tests[0];
        },
        [fetchTests.rejected]: (state) => {
            onRejectedDefault(state);
            state.tests = [];
            state.selectedTest = null;
        },

        [fetchTest.pending]: (state) => {
            onPendingDefault(state);
        },
        [fetchTest.fulfilled]: (state, { payload: { test, hasError } }) => {
            onFulfilledDefault(state, hasError);
            state.selectedTest = test;
        },
        [fetchTest.rejected]: (state) => {
            onRejectedDefault(state);
            state.selectedTest = null;
        },

        [createTest.pending]: (state) => {
            onPendingDefault(state);
        },
        [createTest.fulfilled]: (state, { payload: { test, hasError } }) => {
            onFulfilledDefault(state, hasError);

            if (!hasError) {
                state.tests = [test, ...state.tests];
                state.selectedTest = test;
            }
        },
        [createTest.rejected]: (state) => {
            onRejectedDefault(state);
        },

        [deleteTest.pending]: (state) => {
            onPendingDefault(state);
        },
        [deleteTest.fulfilled]: (state, { payload: { testId, hasError } }) => {
            onFulfilledDefault(state, hasError);

            if (!hasError) {
                state.tests = state.tests.filter((test) => test.id !== testId);

                if (state.selectedTest.id === testId)
                    state.selectedTest = state.tests[0];
            }
        },
        [deleteTest.rejected]: (state) => {
            onRejectedDefault(state);
        },

        [selectTest]: (state, { payload: { test } }) => {
            state.selectedTest = test;
            state.hasUnsavedChanges = false;
        }
    }
});

export default testSlice.reducer;