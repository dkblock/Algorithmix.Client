import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault, onSavingDefault } from "./defaults";
import { createTest, deleteTest, fetchTests, selectTest } from "../actions/test";

const initialState = {
  tests: [],
  selectedTestId: null,

  totalCount: 0,
  searchText: "",
  pageIndex: 1,
  pageSize: 20,
  sortBy: "updatedDate",
  sortDirection: "desc",

  isFetching: false,
  isSaving: false,
  hasError: false,
};

const testSlice = createSlice({
  name: "testSlice",
  initialState: initialState,
  extraReducers: {
    [fetchTests.pending]: (state, { meta: { arg } }) => {
      onPendingDefault(state);

      const { searchText, pageIndex, sortBy, sortDirection } = arg;
      state.searchText = searchText;
      state.pageIndex = pageIndex;
      state.sortBy = sortBy;
      state.sortDirection = sortDirection;
    },
    [fetchTests.fulfilled]: (state, { payload: { tests, totalCount, hasError } }) => {
      onFulfilledDefault(state, hasError);

      state.tests = tests;
      state.totalCount = totalCount;
    },
    [fetchTests.rejected]: (state) => {
      onRejectedDefault(state);

      state.tests = [];
      state.totalCount = 0;
    },

    [createTest.pending]: (state) => {
      onSavingDefault(state);
    },
    [createTest.fulfilled]: (state, { payload: { createdTest, hasError } }) => {
      onFulfilledDefault(state, hasError);
      if (hasError) return;

      state.tests = [createdTest, ...state.tests];
      state.totalCount++;
    },
    [createTest.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [deleteTest.pending]: (state) => {
      onSavingDefault(state);
    },
    [deleteTest.fulfilled]: (state, { payload: { testId, hasError } }) => {
      onFulfilledDefault(state, hasError);
      if (hasError) return;

      state.tests = state.tests.filter((test) => test.id !== testId);
      state.totalCount--;

      if (state.selectedTestId === testId) {
        state.selectedTestId = state.tests[0]?.id;
      }
    },
    [deleteTest.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [selectTest]: (state, { payload: { testId } }) => {
      state.selectedTestId = testId;
    },
  },
});

export default testSlice.reducer;
