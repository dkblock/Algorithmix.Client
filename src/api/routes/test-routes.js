import { getRoute } from "../../utils/get-route";

const testRoutes = {
  fetchPublishedTests: (searchText) => getRoute("tests/published", { searchText }),
  fetchTests: () => getRoute("tests"),
  fetchTest: (testId) => getRoute(`tests/${testId}`),
  fetchTestStats: (testId) => getRoute(`tests/${testId}/stats`),
  createTest: () => getRoute("tests"),
  deleteTest: (testId) => getRoute(`tests/${testId}`),
  updateTest: (testId) => getRoute(`tests/${testId}`),
  publishTest: (testId, params) => getRoute(`tests/${testId}/publish`, params),

  startTestPass: (testId) => getRoute(`tests/${testId}/pass`),
  fetchTestResult: (testId) => getRoute(`tests/${testId}/result`),
};

export default testRoutes;
