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

  updateUserInformation: async (userInformation) => {
    const url = api.account.updateUserInformation();
    return await baseService.put(url, userInformation);
  },

  confirmEmailRequest: async () => {
    const url = api.account.confirmEmail();
    return await baseService.get(url);
  },

  confirmEmail: async (credentials) => {
    const url = api.account.confirmEmail();
    return await baseService.post(url, credentials);
  },

  changePassword: async (credentials) => {
    const url = api.account.changePassword();
    return await baseService.put(url, credentials);
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
