import { getRoute } from "../../utils/get-route";

const testAnswerRoutes = {
  fetchTestAnswers: (testId, questionId) => getRoute(`tests/${testId}/questions/${questionId}/answers`),
  fetchTestAnswer: (testId, questionId, answerId) =>
    getRoute(`tests/${testId}/questions/${questionId}/answers/${answerId}`),
  createTestAnswer: (testId, questionId) => getRoute(`tests/${testId}/questions/${questionId}/answers`),
  deleteTestAnswer: (testId, questionId, answerId) =>
    getRoute(`tests/${testId}/questions/${questionId}/answers/${answerId}`),
  updateTestAnswer: (testId, questionId, answerId) =>
    getRoute(`tests/${testId}/questions/${questionId}/answers/${answerId}`),
  moveTestAnswer: (testId, questionId) => getRoute(`tests/${testId}/questions/${questionId}/answers/move`),
};

export default testAnswerRoutes;