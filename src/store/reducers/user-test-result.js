import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault, onSavingDefault } from "./defaults";
import { deleteTestResult, fetchTestResults } from "../actions/user-test-result";

const initialState = {
  testResults: [],
  isFetching: false,
  isSaving: false,
  hasError: false,
};

const userTestResultSlice = createSlice({
  name: "userTestResultSlice",
  initialState: initialState,
  extraReducers: {
    [fetchTestResults.pending]: (state) => {
      onPendingDefault(state);
    },
    [fetchTestResults.fulfilled]: (state, { payload: { testResults, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.testResults = testResults;
    },
    [fetchTestResults.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [deleteTestResult.pending]: (state) => {
      onSavingDefault(state);
    },
    [deleteTestResult.fulfilled]: (state, { payload: { testId, userId, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.testResults = state.testResults.filter((result) => result.test.id !== testId || result.user.id !== userId);
    },
    [deleteTestResult.rejected]: (state) => {
      onRejectedDefault(state);
    },
  },
});

export default userTestResultSlice.reducer;
