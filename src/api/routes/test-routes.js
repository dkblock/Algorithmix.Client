import { getRoute } from "../../utils/get-route";

const testRoutes = {
    fetchTests: () => getRoute("tests"),
    fetchTest: (testId) => getRoute(`tests/${testId}`),
    createTest: () => getRoute("tests"),
    deleteTest: (testId) => getRoute(`tests/${testId}`),
    updateTest: (testId) => getRoute(`tests/${testId}`),

    fetchTestQuestions: (testId) => getRoute(`tests/${testId}/test-questions`),
    fetchTestQuestion: (testId, questionId) => getRoute(`tests/${testId}/test-questions/${questionId}`),
    createTestQuestion: (testId) => getRoute(`tests/${testId}/test-questions`),
    deleteTestQuestion: (testId, questionId) => getRoute(`tests/${testId}/test-questions/${questionId}`),
    updateTestQuestion: (testId, questionId) => getRoute(`tests/${testId}/test-questions/${questionId}`),
};

export default testRoutes;