import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault } from "./defaults";
import { fetchNextTestQuestion, fetchPreviousTestQuestion, fetchTestResult, startTestPass } from "../actions/test-pass";

const initialState = {
  currentTest: null,
  currentQuestion: null,
  testResult: null,

  isFetching: false,
  isHandlingResult: false,
  hasError: false,
};

const testPassSlice = createSlice({
  name: "testPassSlice",
  initialState: initialState,
  extraReducers: {
    [startTestPass.pending]: (state) => {
      onPendingDefault(state);
    },
    [startTestPass.fulfilled]: (state, { payload: { question, hasError } }) => {
      onFulfilledDefault(state);

      if (!hasError) {
        state.currentQuestion = question;
      }
    },
    [startTestPass.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [fetchNextTestQuestion.pending]: (state) => {
      onPendingDefault(state);
      state.isHandlingResult = true;
      state.currentQuestion = null;
    },
    [fetchNextTestQuestion.fulfilled]: (state, { payload: { question, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.isHandlingResult = false;

      if (!hasError) {
        state.currentQuestion = question;
      }
    },
    [fetchNextTestQuestion.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [fetchPreviousTestQuestion.pending]: (state) => {
      onPendingDefault(state);
    },
    [fetchPreviousTestQuestion.fulfilled]: (state, { payload: { question, hasError } }) => {
      onFulfilledDefault(state, hasError);

      if (!hasError) {
        state.currentQuestion = question;
      }
    },
    [fetchPreviousTestQuestion.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [fetchTestResult.pending]: (state) => {
      onPendingDefault(state);
      state.testResult = null;
    },
    [fetchTestResult.fulfilled]: (state, { payload: { testResult, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.testResult = testResult;
    },
    [fetchTestResult.rejected]: (state) => {
      onRejectedDefault(state);
    },
  },
});

export default testPassSlice.reducer;
