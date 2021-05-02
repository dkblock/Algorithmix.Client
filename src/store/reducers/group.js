import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault } from "./defaults";
import { fetchGroups } from "../actions/group";

const initialState = {
  groups: [],
  isFetching: false,
  hasError: false,
};

const groupSlice = createSlice({
  name: "groupSlice",
  initialState: initialState,
  extraReducers: {
    [fetchGroups.pending]: (state) => {
      onPendingDefault(state);
      state.groups = [];
    },
    [fetchGroups.fulfilled]: (state, { payload: { groups, hasError } }) => {
      onFulfilledDefault(state, hasError);

      if (!hasError) {
        state.groups = groups;
      }
    },
    [fetchGroups.rejected]: (state) => {
      onRejectedDefault(state);
    },
  },
});

export default groupSlice.reducer;
