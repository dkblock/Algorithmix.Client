import { getRoute } from "../../utils/get-route";

const testRoutes = {
  fetchTests: () => getRoute("tests"),
  fetchTest: (testId) => getRoute(`tests/${testId}`),
  createTest: () => getRoute("tests"),
  deleteTest: (testId) => getRoute(`tests/${testId}`),
  updateTest: (testId) => getRoute(`tests/${testId}`),
  publishTest: (testId) => getRoute(`tests/${testId}/publish`),

  startTestPass: (testId) => getRoute(`tests/${testId}/pass`),
  fetchTestResult: (testId) => getRoute(`tests/${testId}/result`),
};

export default testRoutes;
