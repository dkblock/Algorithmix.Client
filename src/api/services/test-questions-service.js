import api from "../api";
import baseService from "./base-service";

const testsQuestionsService = {
    fetchQuestions: async (testId) => {
        const url = api.tests.fetchTestQuestions(testId);
        return await baseService.get(url);
    },

    fetchQuestion: async (testId, questionId) => {
        const url = api.tests.fetchTestQuestion(testId, questionId);
        return await baseService.get(url);
    },

    createQuestion: async (testId, createdQuestion) => {
        const url = api.tests.createTest();
        return await baseService.post(url, createdQuestion);
    },

    deleteQuestion: async (testId, questionId) => {
        const url = api.tests.deleteTestQuestion(testId, questionId);
        return await baseService.delete(url);
    },

    updateQuestion: async (testId, questionId, updatedQuestion) => {
        const url = api.tests.updateTestQuestion(testId, questionId);
        return await baseService.put(url, updatedQuestion);
    }
};

export default testsQuestionsService;