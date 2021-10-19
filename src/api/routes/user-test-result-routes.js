import { getRoute } from "../../utils/get-route";

const userTestResultRoutes = {
  fetchTestResults: (params) => getRoute("test-results", params),
  fetchTestResult: (testId, userId) => getRoute(`test-results/${testId}/${userId}`),
  deleteTestResult: (testId, userId) => getRoute(`test-results/${testId}/${userId}`),
};

export default userTestResultRoutes;
