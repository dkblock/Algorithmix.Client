import api from "../api";
import baseService from "./base-service";
import fileService from "./file-service";

const algorithmService = {
  fetchAlgorithms: async (searchText, onlyAccessible, pageIndex, pageSize, sortBy, sortDirection) => {
    const params = {
      searchText,
      onlyAccessible,
      pageIndex,
      pageSize,
      sortBy,
      desc: sortDirection === "desc",
    };

    const url = api.algorithms.fetchAlgorithms(params);
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

  updateAlgorithmTimeComplexity: async (algorithmId, timeComplexity) => {
    const url = api.algorithms.updateAlgorithmTimeComplexity(algorithmId);
    return await baseService.put(url, timeComplexity);
  },

  uploadAlgorithmDescription: async (algorithmId, description) => {
    const url = api.algorithms.uploadAlgorithmDescription(algorithmId);
    return await fileService.post(url, description);
  },

  clearAlgorithmDescription: async (algorithmId) => {
    const url = api.algorithms.clearAlgorithmDescription(algorithmId);
    return await baseService.delete(url);
  },

  downloadAlgorithmDescription: async (algorithmId) => {
    const url = api.algorithms.downloadAlgorithmDescription(algorithmId);
    return await fileService.get(url, `${algorithmId}.zip`);
  },

  uploadAlgorithmConstructor: async (algorithmId, constructor) => {
    const url = api.algorithms.uploadAlgorithmConstructor(algorithmId);
    return await fileService.post(url, constructor);
  },

  clearAlgorithmConstructor: async (algorithmId) => {
    const url = api.algorithms.clearAlgorithmConstructor(algorithmId);
    return await baseService.delete(url);
  },

  downloadAlgorithmConstructor: async (algorithmId) => {
    const url = api.algorithms.downloadAlgorithmConstructor(algorithmId);
    return await fileService.get(url, `${algorithmId}.zip`);
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
