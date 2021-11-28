import { getRoute } from "../../utils/get-route";

const testRoutes = {
  fetchPublishedTests: (params) => getRoute("tests/published", params),
  fetchPublishedTest: (testId) => getRoute(`tests/published/${testId}`),
  fetchTests: (params) => getRoute("tests", params),
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
