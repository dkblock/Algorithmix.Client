import api from "../api";
import baseService from "./base-service";

const algorithmService = {
  fetchAlgorithms: async () => {
    const url = api.algorithms.fetchAlgorithmsUrl();
    return await baseService.get(url);
  },
};

export default algorithmService;