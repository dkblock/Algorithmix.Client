import { createAsyncThunk } from "@reduxjs/toolkit";
import accountService from "../../api/services/account-service";

export const login = createAsyncThunk("login",
    async (credentials) => {
        await accountService.login(credentials);
    });

export const register = createAsyncThunk("register",
    async (credentials) => {
        await accountService.register(credentials);
    });