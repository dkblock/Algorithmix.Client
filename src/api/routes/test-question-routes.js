import { getRoute } from "../../utils/get-route";

const testQuestionRoutes = {
  fetchTestQuestions: (testId) => getRoute(`tests/${testId}/questions`),
  fetchTestQuestion: (testId, questionId) => getRoute(`tests/${testId}/questions/${questionId}`),
  createTestQuestion: (testId) => getRoute(`tests/${testId}/questions`),
  deleteTestQuestion: (testId, questionId) => getRoute(`tests/${testId}/questions/${questionId}`),
  updateTestQuestion: (testId, questionId) => getRoute(`tests/${testId}/questions/${questionId}`),

  moveTestQuestions: (testId) => getRoute(`tests/${testId}/questions/move`),
  uploadTestQuestionImage: (testId, questionId) => getRoute(`tests/${testId}/questions/${questionId}/image`),
  clearTestQuestionImage: (testId, questionId) => getRoute(`tests/${testId}/questions/${questionId}/image`),

  fetchNextTestQuestion: (testId) => getRoute(`tests/${testId}/pass/next`),
  fetchPreviousTestQuestion: (testId) => getRoute(`tests/${testId}/pass/previous`),
};

export default testQuestionRoutes;
