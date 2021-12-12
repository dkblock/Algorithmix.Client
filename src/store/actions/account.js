import { createAsyncThunk } from "@reduxjs/toolkit";
import accountService from "../../api/services/account-service";
import statusCode from "../../utils/status-code-reader";
import { navigateToAccountSettings, navigateToHome } from "../../utils/navigator";
import { clearAccessToken, getAccessToken, setAccessToken } from "../../utils/local-storage-manager";
import { hideModal, showModal } from "./modal";
import modalTypes from "../../constants/modal-types";

export const authenticate = createAsyncThunk("authenticate", async () => {
  if (!getAccessToken()) {
    return { currentUser: {}, isAuthenticated: false };
  }

  const response = await accountService.auth();
  return await getAuthenticationResult(response);
});

export const login = createAsyncThunk("login", async ({ credentials }) => {
  const response = await accountService.login(credentials);
  const loginResult = await getAuthenticationResult(response);
  const { hasError } = loginResult;

  if (!hasError) navigateToHome();

  return loginResult;
});

export const register = createAsyncThunk("register", async ({ credentials }) => {
  const response = await accountService.register(credentials);
  return await getAuthenticationResult(response);
});

export const logout = createAsyncThunk("logout", (params, thunkAPI) => {
  thunkAPI.dispatch(hideModal());

  clearAccessToken();
  navigateToHome();
});

export const updateUserInformation = createAsyncThunk("updateUserInformation", async ({ userInformation }) => {
  const response = await accountService.updateUserInformation(userInformation);
  return await getAuthenticationResult(response);
});

export const confirmEmailRequest = createAsyncThunk("confirmEmailRequest", async () => {
  await accountService.confirmEmailRequest();
});

export const confirmEmail = createAsyncThunk("confirmEmail", async ({ credentials }) => {
  const response = await accountService.confirmEmail(credentials);

  if (statusCode.ok(response)) {
    navigateToAccountSettings();
    window.location.reload();

    return { hasError: false };
  }

  return { hasError: true };
});

export const changePassword = createAsyncThunk("changePassword", async ({ credentials }, thunkAPI) => {
  const response = await accountService.changePassword(credentials);

  if (statusCode.ok(response)) {
    thunkAPI.dispatch(hideModal());
    thunkAPI.dispatch(showModal(modalTypes.passwordChanged));

    return { validationErrors: {}, hasError: false };
  }

  if (statusCode.badRequest(response)) {
    const { validationErrors: errors } = await response.json();
    const validationErrors = {};
    errors.forEach((error) => (validationErrors[error.field] = error.message));

    return { validationErrors, hasError: true };
  }

  return { hasError: true };
});

export const resetPasswordRequest = createAsyncThunk("resetPasswordRequest", async ({ credentials }) => {
  const response = await accountService.resetPasswordRequest(credentials);
  return await getResetPasswordResult(response);
});

export const resetPassword = createAsyncThunk("resetPassword", async ({ credentials }) => {
  const response = await accountService.resetPassword(credentials);
  return await getResetPasswordResult(response);
});

export const showZoomImageModal = createAsyncThunk("showZoomImageModal", ({ src }, thunkApi) => {
  thunkApi.dispatch(showModal(modalTypes.zoomImage, { src }));
});

export const showLogoutModal = createAsyncThunk("showLogoutModal", (_, thunkAPI) => {
  thunkAPI.dispatch(showModal(modalTypes.logout));
});

export const showConfirmEmailModal = createAsyncThunk("showConfirmEmailModal", ({ email }, thunkAPI) => {
  thunkAPI.dispatch(showModal(modalTypes.confirmEmail, { email }));
});

export const showChangePasswordModal = createAsyncThunk("showChangePasswordModal", async (_, thunkAPI) => {
  thunkAPI.dispatch(showModal(modalTypes.changePassword));
});

const getAuthenticationResult = async (response) => {
  if (statusCode.ok(response)) {
    const { accessToken, currentUser } = await response.json();
    setAccessToken(accessToken);

    return { currentUser, isAuthenticated: true, hasError: false, validationErrors: {} };
  }

  if (statusCode.badRequest(response)) {
    clearAccessToken();

    const { validationErrors: errors } = await response.json();
    const validationErrors = {};
    errors.forEach((error) => (validationErrors[error.field] = error.message));

    return { currentUser: {}, isAuthenticated: false, hasError: true, validationErrors };
  }
};

const getResetPasswordResult = async (response) => {
  if (statusCode.ok(response)) {
    return { validationErrors: {}, hasError: false };
  }

  if (statusCode.badRequest(response)) {
    const { validationErrors: errors } = await response.json();
    const validationErrors = {};
    errors.forEach((error) => (validationErrors[error.field] = error.message));

    return { validationErrors, hasError: true };
  }

  return { hasError: true };
};
