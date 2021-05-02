import { createAsyncThunk } from "@reduxjs/toolkit";
import accountService from "../../api/services/account-service";
import statusCode from "../../utils/status-code-reader";
import { navigateToHome } from "../../utils/navigator";
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
  const registerResult = await getAuthenticationResult(response);
  const { hasError } = registerResult;

  if (!hasError) navigateToHome();

  return registerResult;
});

export const logout = createAsyncThunk("logout", (params, thunkAPI) => {
  thunkAPI.dispatch(hideModal());

  clearAccessToken();
  navigateToHome();
});

export const showZoomImageModal = createAsyncThunk("showZoomImageModal", ({ src }, thunkApi) => {
  thunkApi.dispatch(showModal(modalTypes.zoomImage, { src }));
});

export const showLogoutModal = createAsyncThunk("showLogoutModal", (params, thunkAPI) => {
  thunkAPI.dispatch(showModal(modalTypes.logout));
});

const getAuthenticationResult = async (response) => {
  if (statusCode.ok(response)) {
    const { accessToken, currentUser } = await response.json();
    setAccessToken(accessToken);

    return { currentUser, isAuthenticated: true, hasError: false, validationErrors: {} };
  }

  if (statusCode.badRequest(response)) {
    const { validationErrors: errors } = await response.json();
    const validationErrors = {};
    errors.forEach((error) => (validationErrors[error.field] = error.message));

    return { currentUser: {}, isAuthenticated: false, hasError: true, validationErrors };
  }
};
