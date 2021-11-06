import api from "../api";
import baseService from "./base-service";

const algorithmService = {
  fetchAlgorithms: async () => {
    const url = api.algorithms.fetchAlgorithms();
    return await baseService.get(url);
  },

  createAlgorithm: async (algorithm) => {
    const url = api.algorithms.createAlgorithm();
    return await baseService.post(url, algorithm);
  },

  deleteAlgorithm: async (algorithmId) => {
    const url = api.algorithms.deleteAlgorithm(algorithmId);
    return await baseService.delete(url);
  },
};

export default algorithmService;
