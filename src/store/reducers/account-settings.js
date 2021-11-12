import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault } from "./defaults";
import { resetPassword, resetPasswordRequest } from "../actions/account";
import { getAccessToken } from "../../utils/local-storage-manager";

const initialState = {
  currentUser: {},
  validationErrors: {},
  isAuthenticated: !!getAccessToken(),
  isFetching: false,
  hasError: false,
};

const accountSettingsSlice = createSlice({
  name: "accountSettingsSlice",
  initialState: initialState,
  extraReducers: {
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
