import api from "../api";
import baseService from "./base-service";

const accountService = () => {
    const auth = async () => {
        const url = api.account.authUrl;
        return await baseService.get(url);
    };

    const login = async (credentials) => {
        const url = api.account.loginUrl;
        return await baseService.post(url, credentials);
    };

    const register = async (credentials) => {
        const url = api.account.registerUrl;
        return await baseService.post(url, credentials);
    };

    return {
        auth,
        login,
        register
    };
};

export default accountService();