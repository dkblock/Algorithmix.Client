import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import accountService from "../../api/services/account-service";
import statusCode from "../../utils/status-code-reader";
import { navigateToHome } from "../../utils/navigator";
import {
    clearAccessToken,
    clearCurrentUserId,
    getAccessToken,
    setAccessToken,
    setCurrentUserId
} from "../../utils/local-storage-manager";

export const auth = createAsyncThunk("auth", async () => {
    if (!getAccessToken())
        return { currentUser: {}, isAuth: false };

    const response = await accountService.auth();
    return await checkAuth(response);
});

export const login = createAsyncThunk("login", async (credentials) => {
    const response = await accountService.login(credentials);
    const loginResult = await checkAuth(response);

    if (loginResult.isAuth) {
        navigateToHome();
        return loginResult;
    }

    return loginResult;
});

export const logout = createAction("logout", () => {
    clearAccessToken();
    clearCurrentUserId();
    navigateToHome();

    return {};
});

export const register = createAsyncThunk("register", async (credentials) => {
    const response = await accountService.register(credentials);
    const registerResult = await checkAuth(response);

    if (registerResult.isAuth) {
        navigateToHome();
        return registerResult;
    }

    return registerResult;
});

const checkAuth = async (response) => {
    if (statusCode.ok(response)) {
        const responseResult = await response.json();
        const accessToken = responseResult.accessToken;
        const userId = responseResult.currentUser.id;

        setAccessToken(accessToken);
        setCurrentUserId(userId);

        return {
            currentUser: responseResult.currentUser,
            isAuth: true
        };
    }

    return {
        currentUser: {},
        isAuth: false
    };
};