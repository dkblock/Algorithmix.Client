import { getRoute } from "../../utils/get-route";

const userTestResultRoutes = {
  fetchTestResults: () => getRoute(`test-results`),
  fetchTestResult: (testId, userId) => getRoute(`test-results/${testId}/${userId}`),
  deleteTestResult: (testId, userId) => getRoute(`test-results/${testId}/${userId}`),
};

export default userTestResultRoutes;