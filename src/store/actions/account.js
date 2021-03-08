import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { clearAccessToken, setAccessToken } from "../../utils/local-storage-manager";
import accountService from "../../api/services/account-service";

export const login = createAsyncThunk("login", async (credentials) => {
    const accessToken = await accountService.login(credentials);
    setAccessToken(accessToken);
});

export const logout = createAction("logout", () => {
    clearAccessToken();
    return { payload: {} };
});

export const register = createAsyncThunk("register", async (credentials) => {
    const accessToken = await accountService.register(credentials);
    setAccessToken(accessToken);
});