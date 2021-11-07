import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault, onSavingDefault } from "./defaults";
import {
  createTest,
  deleteTest,
  fetchPublishedTests,
  fetchTests,
  selectTest
} from "../actions/test";

const initialState = {
  publishedTests: [],
  tests: [],
  selectedTestId: null,

  isFetching: false,
  isSaving: false,
  hasError: false,
};

const testSlice = createSlice({
  name: "testSlice",
  initialState: initialState,
  extraReducers: {
    [fetchPublishedTests.pending]: (state) => {
      onPendingDefault(state);
      state.publishedTests = [];
    },
    [fetchPublishedTests.fulfilled]: (state, { payload: { tests, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.publishedTests = tests;
      state.selectedTestId = state.selectedTestId ?? tests[0]?.id;
    },
    [fetchPublishedTests.rejected]: (state) => {
      onRejectedDefault(state);
      state.publishedTests = [];
      state.selectedTestId = null;
    },

    [fetchTests.pending]: (state) => {
      onPendingDefault(state);
    },
    [fetchTests.fulfilled]: (state, { payload: { tests, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.tests = tests;
    },
    [fetchTests.rejected]: (state) => {
      onRejectedDefault(state);
      state.tests = [];
    },

    [createTest.pending]: (state) => {
      onSavingDefault(state);
    },
    [createTest.fulfilled]: (state, { payload: { createdTest, hasError } }) => {
      onFulfilledDefault(state, hasError);

      if (!hasError) {
        state.tests = [createdTest, ...state.tests];
      }
    },
    [createTest.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [deleteTest.pending]: (state) => {
      onSavingDefault(state);
    },
    [deleteTest.fulfilled]: (state, { payload: { testId, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.tests = state.tests.filter((test) => test.id !== testId);

      if (state.selectedTestId === testId) {
        state.selectedTestId = state.tests[0]?.id;
      }
    },
    [deleteTest.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [selectTest]: (state, { payload: { testId } }) => {
      state.selectedTestId = testId;
    }
  },
});

export default testSlice.reducer;
