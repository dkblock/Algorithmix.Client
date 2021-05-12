import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault, onSavingDefault } from "./defaults";
import { fetchTestStats } from "../actions/test-stats";

const initialState = {
  test: null,
  questions: [],

  isFetching: false,
  isSaving: false,
  hasError: false,
};

const testStatsSlice = createSlice({
  name: "testStatsSlice",
  initialState: initialState,
  extraReducers: {
    [fetchTestStats.pending]: (state) => {
      onPendingDefault(state);
    },
    [fetchTestStats.fulfilled]: (state, { payload: { test, questions, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.test = test;
      state.questions = questions;
    },
    [fetchTestStats.rejected]: (state) => {
      onRejectedDefault(state);
    },
  },
});

export default testStatsSlice.reducer;
