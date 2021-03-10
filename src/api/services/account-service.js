import api from "../api";
import baseService from "./base-service";

const accountService = () => {
    const login = async (credentials) => {
        const url = api.account.loginUrl();
        return await baseService.post(url, credentials);
    };

    const register = async (credentials) => {
        const url = api.account.registerUrl();
        return await baseService.post(url, credentials);
    };

    return {
        login,
        register
    };
};

export default accountService();