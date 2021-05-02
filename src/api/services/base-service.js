import { getAccessToken } from "../../utils/local-storage-manager";

const token = getAccessToken();

const baseService = {
  get: async (url) => {
    try {
      return await fetch(url, {
        method: "GET",
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      });
    } catch (e) {
      console.log(e);
    }
  },

  post: async (url, data) => {
    try {
      return await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log(e);
    }
  },

  delete: async (url) => {
    try {
      return await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
        },
      });
    } catch (e) {
      console.log(e);
    }
  },

  put: async (url, data) => {
    try {
      return await fetch(url, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: token ? `Bearer ${token}` : null,
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log(e);
    }
  },
};

export default baseService;
