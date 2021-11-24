import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault, onSavingDefault } from "./defaults";
import { createAlgorithm, deleteAlgorithm, fetchAlgorithms } from "../actions/algorithm";
import { algorithmFetchParams } from "./default-states";

const initialState = {
  algorithms: [],
  totalCount: 0,
  ...algorithmFetchParams,

  isFetching: false,
  hasError: false,
};

const algorithmSlice = createSlice({
  name: "algorithmSlice",
  initialState: initialState,
  extraReducers: {
    [fetchAlgorithms.pending]: (state, { meta: { arg } }) => {
      onPendingDefault(state);

      const { searchText, pageIndex, sortBy, sortDirection } = arg;
      state.searchText = searchText;
      state.pageIndex = pageIndex;
      state.sortBy = sortBy;
      state.sortDirection = sortDirection;
    },
    [fetchAlgorithms.fulfilled]: (state, { payload: { algorithms, totalCount, hasError } }) => {
      onFulfilledDefault(state, hasError);

      state.algorithms = algorithms;
      state.totalCount = totalCount;
    },
    [fetchAlgorithms.rejected]: (state) => {
      onRejectedDefault(state);

      state.algorithms = [];
      state.totalCount = 0;
    },

    [createAlgorithm.pending]: (state) => {
      onSavingDefault(state);
    },
    [createAlgorithm.fulfilled]: (state, { payload: { createdAlgorithm, validationErrors, hasError } }) => {
      onFulfilledDefault(state, hasError);

      if (!hasError) {
        state.algorithms = [...state.algorithms, createdAlgorithm];
        state.totalCount++;
      } else {
        state.validationErrors = validationErrors;
      }
    },
    [createAlgorithm.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [deleteAlgorithm.pending]: (state) => {
      onSavingDefault(state);
    },
    [deleteAlgorithm.fulfilled]: (state, { payload: { algorithmId, hasError } }) => {
      onFulfilledDefault(state, hasError);
      if (hasError) return;

      state.algorithms = state.algorithms.filter((algorithm) => algorithm.id !== algorithmId);
      state.totalCount--;
    },
    [deleteAlgorithm.rejected]: (state) => {
      onRejectedDefault(state);
    },
  },
});

export default algorithmSlice.reducer;
