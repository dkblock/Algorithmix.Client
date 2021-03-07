import { createAsyncThunk } from "@reduxjs/toolkit";
import algorithmsService from "../../api/services/algorithms-service";
import accountService from "../../api/services/account-service";

export const fetchAlgorithms = createAsyncThunk("fetchAlgorithms",
    async () => (
        await algorithmsService.fetchAlgorithms()
    ));

export const getData = createAsyncThunk("getData",
    async () => {
        await accountService.auth()
    });

export const login = createAsyncThunk("login",
    async () => {
        await accountService.login()
    });

export const logout = createAsyncThunk("logout",
    async () => {
        await accountService.logout()
    });