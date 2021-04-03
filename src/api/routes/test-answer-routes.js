import { getRoute } from "../../utils/get-route";

const testAnswerRoutes = {
    fetchTestAnswers: (testId, questionId) =>
        getRoute(`tests/${testId}/questions/${questionId}`),
    fetchTestAnswer: (testId, questionId, answerId) =>
        getRoute(`tests/${testId}/questions/${questionId}/answers/${answerId}`),
    createTestAnswer: (testId, questionId) =>
        getRoute(`tests/${testId}/questions/${questionId}`),
    deleteTestAnswer: (testId, questionId, answerId) =>
        getRoute(`tests/${testId}/questions/${questionId}answers/${answerId}`),
    updateTestAnswer: (testId, questionId, answerId) =>
        getRoute(`tests/${testId}/questions/${questionId}answers/${answerId}`),
};

export default testAnswerRoutes;