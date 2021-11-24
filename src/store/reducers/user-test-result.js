import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault, onSavingDefault } from "./defaults";
import { deleteUserTestResult, fetchUserTestResult, fetchUserTestResults } from "../actions/user-test-result";

const initialState = {
  testResults: [],
  testResult: null,

  totalCount: 0,
  searchText: "",
  pageIndex: 1,
  pageSize: 20,
  sortBy: "passingTime",
  sortDirection: "desc",

  isFetching: false,
  isSaving: false,
  hasError: false,
};

const userTestResultSlice = createSlice({
  name: "userTestResultSlice",
  initialState: initialState,
  extraReducers: {
    [fetchUserTestResults.pending]: (state, { meta: { arg } }) => {
      onPendingDefault(state);

      const { searchText, pageIndex, sortBy, sortDirection } = arg;
      state.searchText = searchText;
      state.pageIndex = pageIndex;
      state.sortBy = sortBy;
      state.sortDirection = sortDirection;
    },
    [fetchUserTestResults.fulfilled]: (state, { payload: { testResults, totalCount, hasError } }) => {
      onFulfilledDefault(state, hasError);

      state.testResults = testResults;
      state.totalCount = totalCount;
    },
    [fetchUserTestResults.rejected]: (state) => {
      onRejectedDefault(state);

      state.testResults = [];
      state.totalCount = 0;
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
      if (hasError) return;

      state.testResults = state.testResults.filter((result) => result.test.id !== testId || result.user.id !== userId);
      state.totalCount--;
    },
    [deleteUserTestResult.rejected]: (state) => {
      onRejectedDefault(state);
    },
  },
});

export default userTestResultSlice.reducer;
