import { getAccessToken } from "../../utils/local-storage-manager";

const imageService = {
  post: async (url, image) => {
    try {
      const formData = new FormData();
      formData.append("image", image);

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

export default imageService;
