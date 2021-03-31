import { getRoute } from "../../utils/get-route";

const testQuestionRoutes = {
    fetchTestQuestions: (testId) => getRoute(`tests/${testId}/test-questions`),
    fetchTestQuestion: (testId, questionId) => getRoute(`tests/${testId}/test-questions/${questionId}`),
    createTestQuestion: (testId) => getRoute(`tests/${testId}/test-questions`),
    deleteTestQuestion: (testId, questionId) => getRoute(`tests/${testId}/test-questions/${questionId}`),
    updateTestQuestion: (testId, questionId) => getRoute(`tests/${testId}/test-questions/${questionId}`),
};

export default testQuestionRoutes;