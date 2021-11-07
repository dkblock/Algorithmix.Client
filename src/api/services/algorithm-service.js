import api from "../api";
import baseService from "./base-service";
import imageService from "./image-service";

const algorithmService = {
  fetchAlgorithms: async () => {
    const url = api.algorithms.fetchAlgorithms();
    return await baseService.get(url);
  },

  fetchAlgorithm: async (algorithmId) => {
    const url = api.algorithms.fetchAlgorithm(algorithmId);
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

  updateAlgorithm: async (algorithmId, algorithm) => {
    const url = api.algorithms.updateAlgorithm(algorithmId);
    return await baseService.put(url, algorithm);
  },

  uploadAlgorithmImage: async (algorithmId, image) => {
    const url = api.algorithms.uploadAlgorithmImage(algorithmId);
    return await imageService.post(url, image);
  },

  clearAlgorithmImage: async (algorithmId) => {
    const url = api.algorithms.clearAlgorithmImage(algorithmId);
    return await baseService.delete(url);
  },
};

export default algorithmService;
