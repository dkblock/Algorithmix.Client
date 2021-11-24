import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault, onSavingDefault } from "./defaults";
import { deleteUser, fetchUsers, updateUser } from "../actions/user";

const initialState = {
  users: [],
  totalCount: 0,
  searchText: "",
  pageIndex: 1,
  pageSize: 20,
  sortBy: "groupId",
  sortDirection: "asc",

  isFetching: false,
  isSaving: false,
  hasError: false,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  extraReducers: {
    [fetchUsers.pending]: (state, { meta: { arg } }) => {
      onPendingDefault(state);

      const { searchText, pageIndex, sortBy, sortDirection } = arg;
      state.searchText = searchText;
      state.pageIndex = pageIndex;
      state.sortBy = sortBy;
      state.sortDirection = sortDirection;
    },
    [fetchUsers.fulfilled]: (state, { payload: { users, totalCount, hasError } }) => {
      onFulfilledDefault(state, hasError);

      state.users = users;
      state.totalCount = totalCount;
    },
    [fetchUsers.rejected]: (state) => {
      onRejectedDefault(state);

      state.users = [];
      state.totalCount = 0;
    },

    [deleteUser.pending]: (state) => {
      onSavingDefault(state);
    },
    [deleteUser.fulfilled]: (state, { payload: { userId, hasError } }) => {
      onFulfilledDefault(state, hasError);
      if (hasError) return;

      state.users = state.users.filter((user) => user.id !== userId);
      state.totalCount--;
    },
    [deleteUser.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [updateUser.pending]: (state) => {
      onSavingDefault(state);
    },
    [updateUser.fulfilled]: (state, { payload: { updatedUser, hasError } }) => {
      onFulfilledDefault(state, hasError);

      if (!hasError) {
        state.users = state.users.map((user) => (user.id === updatedUser.id ? updatedUser : user));
      }
    },
    [updateUser.rejected]: (state) => {
      onRejectedDefault(state);
    },
  },
});

export default userSlice.reducer;
