import api from "../api";
import baseService from "./base-service";

const testQuestionService = {
  fetchQuestions: async (testId) => {
    const url = api.testQuestions.fetchTestQuestions(testId);
    return await baseService.get(url);
  },

  fetchQuestion: async (testId, questionId) => {
    const url = api.testQuestions.fetchTestQuestion(testId, questionId);
    return await baseService.get(url);
  },

  createQuestion: async (testId, createdQuestion) => {
    const url = api.testQuestions.createTestQuestion(testId);
    return await baseService.post(url, createdQuestion);
  },

  deleteQuestion: async (testId, questionId) => {
    const url = api.testQuestions.deleteTestQuestion(testId, questionId);
    return await baseService.delete(url);
  },

  updateQuestion: async (testId, questionId, updatedQuestion) => {
    const url = api.testQuestions.updateTestQuestion(testId, questionId);
    return await baseService.put(url, updatedQuestion);
  },

  moveQuestion: async (testId, indexes) => {
    const url = api.testQuestions.moveTestQuestions(testId);
    return await baseService.put(url, indexes);
  },
};

export default testQuestionService;
