import { getRoute } from "../../utils/get-route";

const testAnswerRoutes = {
    fetchTestAnswers: (testId, questionId) =>
        getRoute(`tests/${testId}/test-questions/${questionId}`),
    fetchTestAnswer: (testId, questionId, answerId) =>
        getRoute(`tests/${testId}/test-questions/${questionId}/test-answers/${answerId}`),
    createTestAnswer: (testId, questionId) =>
        getRoute(`tests/${testId}/test-questions/${questionId}`),
    deleteTestAnswer: (testId, questionId, answerId) =>
        getRoute(`tests/${testId}/test-questions/${questionId}test-answers/${answerId}`),
    updateTestAnswer: (testId, questionId, answerId) =>
        getRoute(`tests/${testId}/test-questions/${questionId}test-answers/${answerId}`),
};

export default testAnswerRoutes;