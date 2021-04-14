import api from "../api";
import baseService from "./base-service";

const testAnswerService = {
    fetchAnswers: async (testId, questionId) => {
        const url = api.testAnswers.fetchTestAnswers(testId, questionId);
        return await baseService.get(url);
    },

    fetchAnswer: async (testId, questionId, answerId) => {
        const url = api.testAnswers.fetchTestAnswer(testId, questionId, answerId);
        return await baseService.get(url);
    },

    createAnswer: async (testId, questionId, createdAnswer) => {
        const url = api.testAnswers.createTestAnswer(testId, questionId);
        return await baseService.post(url, createdAnswer);
    },

    deleteAnswer: async (testId, questionId, answerId) => {
        const url = api.testAnswers.deleteTestAnswer(testId, questionId, answerId);
        return await baseService.delete(url);
    },

    updateAnswer: async (testId, questionId, answerId, updatedAnswer) => {
        const url = api.testAnswers.updateTestAnswer(testId, questionId, answerId);
        return await baseService.put(url, updatedAnswer);
    },

    moveAnswer: async (testId, questionId, indexes) => {
        const url = api.testAnswers.moveTestAnswer(testId, questionId);
        return await baseService.put(url, indexes);
    },
};

export default testAnswerService;