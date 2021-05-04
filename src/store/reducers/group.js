import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault, onSavingDefault } from "./defaults";
import { createGroup, deleteGroup, fetchGroups, updateGroup } from "../actions/group";

const initialState = {
  groups: [],
  isFetching: false,
  isSaving: false,
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
      state.groups = groups;
    },
    [fetchGroups.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [createGroup.pending]: (state) => {
      onSavingDefault(state);
    },
    [createGroup.fulfilled]: (state, { payload: { createdGroup, validationErrors, hasError } }) => {
      onFulfilledDefault(state, hasError);

      if (!hasError) {
        state.groups = [...state.groups, createdGroup];
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
      state.groups = state.groups.filter((group) => group.id !== groupId);
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
    },
  },
});

export default groupSlice.reducer;
