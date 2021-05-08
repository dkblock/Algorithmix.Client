import { getAccessToken } from "../../utils/local-storage-manager";

const baseService = {
  get: async (url) => {
    try {
      return await fetch(url, {
        method: "GET",
        headers: {
          Authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : null,
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
          Authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : null,
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
          Authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : null,
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
          Authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : null,
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log(e);
    }
  },
};

export default baseService;
