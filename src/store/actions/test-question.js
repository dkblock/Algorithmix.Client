import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import testQuestionService from "../../api/services/test-question-service";
import testQuestionTypes from "../../constants/test-question-types";
import statusCode from "../../utils/status-code-reader";

export const fetchTestQuestions = createAsyncThunk("fetchTestQuestions", async (testId) => {
  const response = await testQuestionService.fetchQuestions(testId);

  if (statusCode(response).ok) {
    const questions = await response.json();
    return {
      questions: questions.map((question) => ({ ...question, isCreated: true })),
      hasError: false,
    };
  }

  return { questions: [], hasError: true };
});

export const selectTestQuestion = createAction("selectQuestion", (question) => ({
  payload: { question },
}));

export const createTestQuestion = createAsyncThunk("createTestQuestion", async (testId) => {
  const response = await testQuestionService.createQuestion(testId, {
    value: "",
    image: null,
    type: testQuestionTypes.singleAnswerQuestion,
    testId,
  });

  if (statusCode(response).created) {
    const createdQuestion = await response.json();
    return { createdQuestion, hasError: false };
  }

  return { hasError: true };
});

export const deleteTestQuestion = createAsyncThunk("deleteTestQuestion", async ({ testId, questionId }) => {
  const response = await testQuestionService.deleteQuestion(testId, questionId);

  if (statusCode(response).noContent) return { questionId, hasError: false };

  return { hasError: true };
});
