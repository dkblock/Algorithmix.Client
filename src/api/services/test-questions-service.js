import api from "../api";
import baseService from "./base-service";

const testsQuestionsService = () => {
    const fetchQuestions = async (testId) => {
        const url = api.tests.fetchTestQuestions(testId);
        return await baseService.getBase(url);
    };

    const fetchQuestion = async (testId, questionId) => {
        const url = api.tests.fetchTestQuestion(testId, questionId);
        return await baseService.getBase(url);
    };

    const createQuestion = async (testId, createdQuestion) => {
        const url = api.tests.createTest();
        return await baseService.postBase(url, createdQuestion);
    };

    const deleteQuestion = async (testId, questionId) => {
        const url = api.tests.deleteTestQuestion(testId, questionId);
        return await baseService.deleteBase(url);
    };

    const updateQuestion = async (testId, questionId, updatedQuestion) => {
        const url = api.tests.updateTestQuestion(testId, questionId);
        return await baseService.putBase(url, updatedQuestion);
    };

    return {
        fetchQuestions,
        fetchQuestion,
        createQuestion,
        deleteQuestion,
        updateQuestion
    };
};

export default testsQuestionsService();