import { getRoute } from "../../utils/get-route";

const fetchTests = () => getRoute("tests");
const fetchTest = (testId) => getRoute(`tests/${testId}`);
const createTest = () => getRoute("tests");
const deleteTest = (testId) => getRoute(`tests/${testId}`);
const updateTest = (testId) => getRoute(`tests/${testId}`);

const fetchTestQuestions = (testId) => getRoute(`tests/${testId}/test-questions`);
const fetchTestQuestion = (testId, questionId) => getRoute(`tests/${testId}/test-questions/${questionId}`);
const createTestQuestion = (testId) => getRoute(`tests/${testId}/test-questions`);
const deleteTestQuestion = (testId, questionId) => getRoute(`tests/${testId}/test-questions/${questionId}`);
const updateTestQuestion = (testId, questionId) => getRoute(`tests/${testId}/test-questions/${questionId}`);

export default {
    fetchTests,
    fetchTest,
    createTest,
    deleteTest,
    updateTest,
    fetchTestQuestions,
    fetchTestQuestion,
    createTestQuestion,
    deleteTestQuestion,
    updateTestQuestion
};