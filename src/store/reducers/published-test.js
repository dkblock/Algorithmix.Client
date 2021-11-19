import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault } from "./defaults";
import { fetchPublishedTests } from "../actions/test";

const initialState = {
  tests: [],
  totalCount: 0,
  searchText: "",
  pageIndex: 1,
  pageSize: 20,
  sortBy: "createdDate",
  sortDirection: "desc",

  isFetching: false,
  hasError: false,
};

const publishedTestSlice = createSlice({
  name: "publishedTestSlice",
  initialState: initialState,
  extraReducers: {
    [fetchPublishedTests.pending]: (state, { meta: { arg } }) => {
      onPendingDefault(state);

      const { searchText, pageIndex, sortBy, sortDirection } = arg;
      state.searchText = searchText;
      state.pageIndex = pageIndex;
      state.sortBy = sortBy;
      state.sortDirection = sortDirection;
    },
    [fetchPublishedTests.fulfilled]: (state, { payload: { tests, totalCount, hasError } }) => {
      onFulfilledDefault(state, hasError);

      state.tests = tests;
      state.totalCount = totalCount;
    },
    [fetchPublishedTests.rejected]: (state) => {
      onRejectedDefault(state);

      state.tests = [];
      state.totalCount = 0;
    },
  },
});

export default publishedTestSlice.reducer;
