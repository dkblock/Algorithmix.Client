import { getRoute } from "../../utils/get-route";

const algorithmRoutes = {
  fetchAlgorithms: () => getRoute("algorithms"),
  fetchAlgorithm: (algorithmId) => getRoute(`algorithms/${algorithmId}`),
  createAlgorithm: () => getRoute("algorithms"),
  deleteAlgorithm: (algorithmId) => getRoute(`algorithms/${algorithmId}`),
  updateAlgorithm: (algorithmId) => getRoute(`algorithms/${algorithmId}`),

  uploadAlgorithmImage: (algorithmId) => getRoute(`algorithms/${algorithmId}/image`),
  clearAlgorithmImage: (algorithmId) => getRoute(`algorithms/${algorithmId}/image`),
};

export default algorithmRoutes;
