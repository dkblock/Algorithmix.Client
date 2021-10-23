import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault } from "./defaults";
import { fetchTestStats } from "../actions/test-stats";

const initialState = {
  test: null,
  questionStats: [],

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
    [fetchTestStats.fulfilled]: (state, { payload: { test, questionStats, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.test = test;
      state.questionStats = questionStats;
    },
    [fetchTestStats.rejected]: (state) => {
      onRejectedDefault(state);
    },
  },
});

export default testStatsSlice.reducer;
