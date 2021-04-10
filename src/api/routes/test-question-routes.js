import { getRoute } from "../../utils/get-route";

const testQuestionRoutes = {
  fetchTestQuestions: (testId) => getRoute(`tests/${testId}/questions`),
  fetchTestQuestion: (testId, questionId) => getRoute(`tests/${testId}/questions/${questionId}`),
  createTestQuestion: (testId) => getRoute(`tests/${testId}/questions`),
  deleteTestQuestion: (testId, questionId) => getRoute(`tests/${testId}/questions/${questionId}`),
  updateTestQuestion: (testId, questionId) => getRoute(`tests/${testId}/questions/${questionId}`),
  moveTestQuestions: (testId) => getRoute(`tests/${testId}/questions/move`),
};

export default testQuestionRoutes;
