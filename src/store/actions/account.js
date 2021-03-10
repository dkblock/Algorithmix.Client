import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import accountService from "../../api/services/account-service";
import statusCode from "../../utils/status-code-reader";
import { navigateToHome } from "../../utils/navigator";
import {
    clearAccessToken,
    clearCurrentUserId,
    setAccessToken,
    setCurrentUserId
} from "../../utils/local-storage-manager";

export const login = createAsyncThunk("login", async (credentials, thunkAPI) => {
    const response = await accountService.login(credentials);
    const loginResult = await thunkAPI.dispatch(checkAuth(response));

    return loginResult.payload;
});

export const logout = createAction("logout", () => {
    clearAccessToken();
    clearCurrentUserId();
    navigateToHome();

    return {};
});

export const register = createAsyncThunk("register", async (credentials, thunkAPI) => {
    const response = await accountService.register(credentials);
    const registerResult = await thunkAPI.dispatch(checkAuth(response));

    return registerResult.payload;
});

const checkAuth = createAsyncThunk("checkAuth", async (response) => {
    if (statusCode.ok(response)) {
        const responseResult = await response.json();
        const accessToken = responseResult.accessToken;
        const userId = responseResult.currentUser.id;

        setAccessToken(accessToken);
        setCurrentUserId(userId);
        navigateToHome();

        return {
            currentUser: responseResult.currentUser,
            isAuth: true
        };
    }

    return {
        currentUser: {},
        isAuth: false
    };
});