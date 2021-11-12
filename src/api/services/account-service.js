import api from "../api";
import baseService from "./base-service";

const accountService = {
  auth: async () => {
    const url = api.account.auth();
    return await baseService.get(url);
  },

  login: async (credentials) => {
    const url = api.account.login();
    return await baseService.post(url, credentials);
  },

  register: async (credentials) => {
    const url = api.account.register();
    return await baseService.post(url, credentials);
  },

  resetPasswordRequest: async (credentials) => {
    const url = api.account.resetPassword();
    return await baseService.post(url, credentials);
  },

  resetPassword: async (credentials) => {
    const url = api.account.resetPassword();
    return await baseService.put(url, credentials);
  },
};

export default accountService;
