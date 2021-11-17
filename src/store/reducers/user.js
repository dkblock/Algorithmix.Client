import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault, onSavingDefault } from "./defaults";
import { deleteUser, fetchUsers, updateUser } from "../actions/user";

const initialState = {
  users: [],
  isFetching: false,
  isSaving: false,
  hasError: false,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      onPendingDefault(state);
    },
    [fetchUsers.fulfilled]: (state, { payload: { users, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.users = users;
    },
    [fetchUsers.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [deleteUser.pending]: (state) => {
      onSavingDefault(state);
    },
    [deleteUser.fulfilled]: (state, { payload: { userId, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.users = state.users.filter((user) => user.id !== userId);
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
