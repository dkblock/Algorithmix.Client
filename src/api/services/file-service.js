import { saveAs } from "file-saver";
import { getAccessToken } from "../../utils/local-storage-manager";

const fileService = {
  get: async (url, fileName) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : null,
        },
      });

      const blob = await response.blob();
      saveAs(blob, fileName);
    } catch (e) {
      console.log(e);
    }
  },

  post: async (url, file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      return await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : null,
        },
      });
    } catch (e) {
      console.log(e);
    }
  },
};

export default fileService;
