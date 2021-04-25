import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault } from "./defaults";
import { createTest, deleteTest, editTest, fetchTest, fetchTests, selectTest } from "../actions/test";
import { fetchTestResult } from "../actions/test-pass";

const initialState = {
  tests: [],
  editedTest: null,
  selectedTestId: null,

  isFetching: false,
  isSaving: false,
  hasError: false,
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
      state.selectedTestId = tests[0].id;
    },
    [fetchTests.rejected]: (state) => {
      onRejectedDefault(state);
      state.tests = [];
      state.selectedTestId = null;
    },

    [fetchTest.pending]: (state) => {
      onPendingDefault(state);
    },
    [fetchTest.fulfilled]: (state, { payload: { test, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.selectedTestId = test.id;
    },
    [fetchTest.rejected]: (state) => {
      onRejectedDefault(state);
      state.selectedTestId = null;
    },

    [createTest.pending]: (state) => {
      onPendingDefault(state);
    },
    [createTest.fulfilled]: (state, { payload: { test, hasError } }) => {
      onFulfilledDefault(state, hasError);

      if (!hasError) {
        state.tests = [test, ...state.tests];
        state.selectedTestId = test.id;
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

        if (state.selectedTestId === testId) {
          state.selectedTestId = state.tests[0]?.id;
        }
      }
    },
    [deleteTest.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [fetchTestResult.fulfilled]: (state, { payload: { testResult, hasError } }) => {
      if (!hasError) {
        state.tests = state.tests.map((test) =>
          test.id === testResult.test.id
            ? {
                ...test,
                userResult: testResult,
              }
            : test
        );
      }
    },

    [selectTest]: (state, { payload: { testId } }) => {
      state.selectedTestId = testId;
    },
    [editTest]: (state, { payload: { test } }) => {
      state.editedTest = test;
    },
  },
});

export default testSlice.reducer;
