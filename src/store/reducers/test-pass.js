import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault } from "./defaults";
import { fetchNextTestQuestion, fetchPreviousTestQuestion, startTestPass } from "../actions/test-pass";

const initialState = {
  currentTest: null,
  currentQuestion: null,
  isFetching: false,
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
    },
    [fetchNextTestQuestion.fulfilled]: (state, { payload: { question, hasError } }) => {
      onFulfilledDefault(state, hasError);

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
  },
});

export default testPassSlice.reducer;
