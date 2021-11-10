import { getRoute } from "../../utils/get-route";

const algorithmRoutes = {
  fetchAlgorithms: () => getRoute("algorithms"),
  fetchAlgorithm: (algorithmId) => getRoute(`algorithms/${algorithmId}`),
  createAlgorithm: () => getRoute("algorithms"),
  deleteAlgorithm: (algorithmId) => getRoute(`algorithms/${algorithmId}`),
  updateAlgorithm: (algorithmId) => getRoute(`algorithms/${algorithmId}`),
  updateAlgorithmTimeComplexity: (algorithmId) => getRoute(`algorithms/${algorithmId}/time-complexity`),

  uploadAlgorithmDescription: (algorithmId) => getRoute(`algorithms/${algorithmId}/description`),
  clearAlgorithmDescription: (algorithmId) => getRoute(`algorithms/${algorithmId}/description`),

  uploadAlgorithmConstructor: (algorithmId) => getRoute(`algorithms/${algorithmId}/constructor`),
  clearAlgorithmConstructor: (algorithmId) => getRoute(`algorithms/${algorithmId}/constructor`),

  uploadAlgorithmImage: (algorithmId) => getRoute(`algorithms/${algorithmId}/image`),
  clearAlgorithmImage: (algorithmId) => getRoute(`algorithms/${algorithmId}/image`),

  downloadAlgorithmDataTemplate: (algorithmId) => getRoute(`algorithms/${algorithmId}/data/template`),
};

export default algorithmRoutes;
