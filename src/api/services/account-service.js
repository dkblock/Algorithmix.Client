import api from "../api";
import baseService from "./base-service";

const accountService = {
    auth: async () => {
        const url = api.account.authUrl();
        return await baseService.get(url);
    },

    login: async (credentials) => {
        const url = api.account.loginUrl();
        return await baseService.post(url, credentials);
    },

    register: async (credentials) => {
        const url = api.account.registerUrl();
        return await baseService.post(url, credentials);
    }
};

export default accountService;