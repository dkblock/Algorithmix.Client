import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault, onSavingDefault } from "./defaults";
import { deleteUserTestResult, fetchUserTestResult, fetchUserTestResults } from "../actions/user-test-result";

const initialState = {
  testResults: [],
  testResult: null,

  isFetching: false,
  isSaving: false,
  hasError: false,
};

const userTestResultSlice = createSlice({
  name: "userTestResultSlice",
  initialState: initialState,
  extraReducers: {
    [fetchUserTestResults.pending]: (state) => {
      onPendingDefault(state);
    },
    [fetchUserTestResults.fulfilled]: (state, { payload: { testResults, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.testResults = testResults;
    },
    [fetchUserTestResults.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [fetchUserTestResult.pending]: (state) => {
      onPendingDefault(state);
    },
    [fetchUserTestResult.fulfilled]: (state, { payload: { testResult, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.testResult = testResult;
    },
    [fetchUserTestResult.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [deleteUserTestResult.pending]: (state) => {
      onSavingDefault(state);
    },
    [deleteUserTestResult.fulfilled]: (state, { payload: { testId, userId, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.testResults = state.testResults.filter((result) => result.test.id !== testId || result.user.id !== userId);
    },
    [deleteUserTestResult.rejected]: (state) => {
      onRejectedDefault(state);
    },
  },
});

export default userTestResultSlice.reducer;
