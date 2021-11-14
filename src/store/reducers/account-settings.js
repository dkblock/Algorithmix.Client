import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault, onSavingDefault } from "./defaults";
import {
  authenticate,
  changePassword,
  confirmEmail,
  login,
  register,
  resetPassword,
  resetPasswordRequest,
  updateUserInformation,
} from "../actions/account";
import { getAccessToken } from "../../utils/local-storage-manager";

const initialState = {
  currentUser: {},
  validationErrors: {},
  isAuthenticated: !!getAccessToken(),

  isFetching: false,
  isSaving: false,
  hasError: false,
};

const accountSettingsSlice = createSlice({
  name: "accountSettingsSlice",
  initialState: initialState,
  extraReducers: {
    [authenticate.fulfilled]: (state, { payload: { currentUser, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.currentUser = currentUser;
    },
    [login.fulfilled]: (state, { payload: { currentUser, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.currentUser = currentUser;
    },
    [register.fulfilled]: (state, { payload: { currentUser, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.currentUser = currentUser;
    },

    [updateUserInformation.pending]: (state) => {
      onSavingDefault(state);
    },
    [updateUserInformation.fulfilled]: (state, { payload: { currentUser, validationErrors, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.validationErrors = validationErrors;

      if (!hasError) {
        state.currentUser = currentUser;
      }
    },
    [updateUserInformation.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [confirmEmail.pending]: (state) => {
      onSavingDefault(state);
    },
    [confirmEmail.fulfilled]: (state, { payload: { hasError } }) => {
      onFulfilledDefault(state, hasError);
      if (hasError) return;

      state.currentUser = { ...state.currentUser, emailConfirmed: true };
    },
    [confirmEmail.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [changePassword.pending]: (state) => {
      onSavingDefault(state);
    },
    [changePassword.fulfilled]: (state, { payload: { validationErrors, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.validationErrors = validationErrors;
    },
    [changePassword.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [resetPasswordRequest.pending]: (state) => {
      onPendingDefault(state);
    },
    [resetPasswordRequest.fulfilled]: (state, { payload: { validationErrors, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.validationErrors = validationErrors;
    },
    [resetPasswordRequest.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [resetPassword.pending]: (state) => {
      onPendingDefault(state);
    },
    [resetPassword.fulfilled]: (state, { payload: { validationErrors, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.validationErrors = validationErrors;
    },
    [resetPassword.rejected]: (state) => {
      onRejectedDefault(state);
    },
  },
});

export default accountSettingsSlice.reducer;
