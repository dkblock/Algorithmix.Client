import api from "../api";
import baseService from "./base-service";
import { setAuthToken, clearAuthToken } from "../../utils/local-storage-manager";

const login = async (credentials) => {
    const url = api.account.loginUrl();
    const response = await baseService.post(url, credentials);
    const responseResult = await response.text();

    setAuthToken(responseResult);
}

const logout = async () => {
    const url = api.account.logoutUrl();
    const data = await fetch(url, { credentials: "include", });

    clearAuthToken();
}

const register = async (credentials) => {
    const url = api.account.registerUrl();
    const response = await baseService.post(url, credentials);
    const responseResult = await response.json();

    console.log(responseResult);
}

export default {
    login,
    logout,
    register
};