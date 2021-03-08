import api from "../api";
import baseService from "./base-service";

const accountService = () => {
    const login = async (credentials) => {
        const url = api.account.loginUrl();
        const response = await baseService.post(url, credentials);

        return await response.text();
    };

    const register = async (credentials) => {
        const url = api.account.registerUrl();
        const response = await baseService.post(url, credentials);

        return await response.json();
    };

    return {
        login,
        register
    };
};

export default accountService();