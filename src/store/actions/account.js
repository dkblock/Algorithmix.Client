import { createAsyncThunk } from "@reduxjs/toolkit";
import accountService from "../../api/services/account-service";
import statusCode from "../../utils/status-code-reader";
import { navigateToHome } from "../../utils/navigator";
import { clearAccessToken, getAccessToken, setAccessToken } from "../../utils/local-storage-manager";
import { hideModal, showModal } from "./modal";
import modalTypes from "../../constants/modal-types";

export const authenticate = createAsyncThunk("authenticate", async () => {
  if (!getAccessToken()) return { currentUser: {}, isAuthenticated: false };

  const response = await accountService.auth();
  return await getAuthState(response);
});

export const login = createAsyncThunk("login", async (credentials) => {
  const response = await accountService.login(credentials);
  const loginResult = await getAuthState(response);

  if (loginResult.isAuthenticated) {
    navigateToHome();
    return loginResult;
  }

  return loginResult;
});

export const logout = createAsyncThunk("logout", (params, thunkAPI) => {
  thunkAPI.dispatch(hideModal());

  clearAccessToken();
  navigateToHome();
});

export const register = createAsyncThunk("register", async (credentials) => {
  const response = await accountService.register(credentials);
  const registerResult = await getAuthState(response);

  if (registerResult.isAuthenticated) {
    navigateToHome();
    return registerResult;
  }

  return registerResult;
});

export const showZoomImageModal = createAsyncThunk("showZoomImageModal", ({ src }, thunkApi) => {
  thunkApi.dispatch(showModal(modalTypes.zoomImage, { src }));
});

export const showLogoutModal = createAsyncThunk("showLogoutModal", (params, thunkAPI) => {
  thunkAPI.dispatch(showModal(modalTypes.logout));
});

const getAuthState = async (response) => {
  if (statusCode(response).ok) {
    const responseResult = await response.json();
    const { accessToken, currentUser } = responseResult;

    setAccessToken(accessToken);

    return { currentUser, isAuthenticated: true };
  }

  return { currentUser: {}, isAuthenticated: false };
};
