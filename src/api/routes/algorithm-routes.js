import { getRoute } from "../../utils/get-route";

const algorithmRoutes = {
  fetchAlgorithms: () => getRoute("algorithms"),
  createAlgorithm: () => getRoute("algorithms"),
  deleteAlgorithm: (algorithmId) => getRoute(`algorithms/${algorithmId}`),
  updateAlgorithm: (algorithmId) => getRoute(`algorithms/${algorithmId}`),
};

export default algorithmRoutes;
