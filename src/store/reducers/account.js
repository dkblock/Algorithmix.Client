import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault } from "./defaults";
import { authenticate, login, logout, register, updateUserInformation } from "../actions/account";
import { getAccessToken } from "../../utils/local-storage-manager";

const initialState = {
  currentUser: {},
  validationErrors: {},
  isAuthenticated: !!getAccessToken(),
  isFetching: true,
  hasError: false,
};

const accountSlice = createSlice({
  name: "accountSlice",
  initialState: initialState,
  extraReducers: {
    [authenticate.pending]: (state) => {
      onPending(state);
    },
    [authenticate.fulfilled]: (state, { payload }) => {
      onFulfilled(state, payload);
    },
    [authenticate.rejected]: (state) => {
      onRejected(state);
    },

    [login.pending]: (state) => {
      onPendingDefault(state);
    },
    [login.fulfilled]: (state, { payload }) => {
      onFulfilled(state, payload);
    },
    [login.rejected]: (state) => {
      onRejected(state);
    },

    [register.pending]: (state) => {
      onPending(state);
    },
    [register.fulfilled]: (state, { payload }) => {
      onFulfilled(state, payload);
    },
    [register.rejected]: (state) => {
      onRejected(state);
    },

    [logout.fulfilled]: (state) => {
      onFulfilledDefault(state);
      state.currentUser = {};
      state.isAuthenticated = false;
      state.validationErrors = {};
    },

    [updateUserInformation.fulfilled]: (state, { payload: { currentUser, hasError } }) => {
      onFulfilledDefault(state, hasError);
      if (hasError) return;

      state.currentUser = currentUser;
    },
  },
});

const onPending = (state) => {
  onPendingDefault(state);
  state.validationErrors = {};
};

const onFulfilled = (state, { currentUser, isAuthenticated, hasError, validationErrors }) => {
  onFulfilledDefault(state, hasError);
  state.currentUser = currentUser;
  state.isAuthenticated = isAuthenticated;
  state.validationErrors = validationErrors;
};

const onRejected = (state) => {
  onRejectedDefault(state);
  state.currentUser = {};
  state.isAuthenticated = false;
  state.validationErrors = {};
};

export default accountSlice.reducer;
