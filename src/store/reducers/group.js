import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault, onSavingDefault } from "./defaults";
import { createGroup, deleteGroup, fetchGroups, updateGroup } from "../actions/group";
import { groupFetchParams } from "./default-states";

const initialState = {
  groups: [],
  totalCount: 0,
  ...groupFetchParams,

  isFetching: false,
  isSaving: false,
  hasError: false
};

const groupSlice = createSlice({
  name: "groupSlice",
  initialState: initialState,
  extraReducers: {
    [fetchGroups.pending]: (state, { meta: { arg } }) => {
      onPendingDefault(state);

      const { searchText, pageIndex, sortBy, sortDirection } = arg;
      state.searchText = searchText;
      state.pageIndex = pageIndex;
      state.sortBy = sortBy;
      state.sortDirection = sortDirection;
    },
    [fetchGroups.fulfilled]: (state, { payload: { groups, totalCount, hasError } }) => {
      onFulfilledDefault(state, hasError);

      state.groups = groups;
      state.totalCount = totalCount;
    },
    [fetchGroups.rejected]: (state) => {
      onRejectedDefault(state);

      state.groups = [];
      state.totalCount = 0;
    },

    [createGroup.pending]: (state) => {
      onSavingDefault(state);
    },
    [createGroup.fulfilled]: (state, { payload: { createdGroup, validationErrors, hasError } }) => {
      onFulfilledDefault(state, hasError);

      if (!hasError) {
        state.groups = [...state.groups, createdGroup];
        state.totalCount++;
      } else {
        state.validationErrors = validationErrors;
      }
    },
    [createGroup.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [deleteGroup.pending]: (state) => {
      onSavingDefault(state);
    },
    [deleteGroup.fulfilled]: (state, { payload: { groupId, hasError } }) => {
      onFulfilledDefault(state, hasError);
      if (hasError) return;

      state.groups = state.groups.filter((group) => group.id !== groupId);
      state.totalCount--;
    },
    [deleteGroup.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [updateGroup.pending]: (state) => {
      onSavingDefault(state);
    },
    [updateGroup.fulfilled]: (state, { payload: { updatedGroup, hasError } }) => {
      onFulfilledDefault(state, hasError);

      if (!hasError) {
        state.groups = state.groups.map((group) => (group.id === updatedGroup.id ? updatedGroup : group));
      }
    },
    [updateGroup.rejected]: (state) => {
      onRejectedDefault(state);
    }
  }
});

export default groupSlice.reducer;
