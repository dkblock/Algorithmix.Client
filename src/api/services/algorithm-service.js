import api from "../api";
import baseService from "./base-service";
import fileService from "./file-service";

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

  uploadAlgorithmDescription: async (algorithmId, description) => {
    const url = api.algorithms.uploadAlgorithmDescription(algorithmId);
    return await fileService.post(url, description);
  },

  clearAlgorithmDescription: async (algorithmId) => {
    const url = api.algorithms.clearAlgorithmDescription(algorithmId);
    return await baseService.delete(url);
  },

  uploadAlgorithmConstructor: async (algorithmId, constructor) => {
    const url = api.algorithms.uploadAlgorithmConstructor(algorithmId);
    return await fileService.post(url, constructor);
  },

  clearAlgorithmConstructor: async (algorithmId) => {
    const url = api.algorithms.clearAlgorithmConstructor(algorithmId);
    return await baseService.delete(url);
  },

  uploadAlgorithmImage: async (algorithmId, image) => {
    const url = api.algorithms.uploadAlgorithmImage(algorithmId);
    return await fileService.post(url, image);
  },

  clearAlgorithmImage: async (algorithmId) => {
    const url = api.algorithms.clearAlgorithmImage(algorithmId);
    return await baseService.delete(url);
  },

  downloadAlgorithmDataTemplate: async (algorithmId) => {
    const url = api.algorithms.downloadAlgorithmDataTemplate(algorithmId);
    await fileService.get(url, `${algorithmId}.zip`);
  },
};

export default algorithmService;
