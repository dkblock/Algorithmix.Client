import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import testQuestionService from "../../api/services/test-question-service";
import testQuestionTypes from "../../constants/test-question-types";
import statusCode from "../../utils/status-code-reader";
import { hideModal, showModal } from "./modal";
import modalTypes from "../../constants/modal-types";

export const fetchTestQuestions = createAsyncThunk("fetchTestQuestions", async ({ testId }) => {
  const response = await testQuestionService.fetchQuestions(testId);

  if (statusCode(response).ok) {
    const questions = await response.json();
    return { questions, hasError: false };
  }

  return { questions: [], hasError: true };
});

export const selectTestQuestion = createAction("selectTestQuestion", ({ question }) => ({
  payload: { question },
}));

export const createTestQuestion = createAsyncThunk("createTestQuestion", async ({ testId, count }) => {
  const response = await testQuestionService.createQuestion(testId, {
    value: `Вопрос ${count + 1}`,
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

export const deleteTestQuestion = createAsyncThunk("deleteTestQuestion", async ({ testId, questionId }, thunkAPI) => {
  thunkAPI.dispatch(hideModal());
  const response = await testQuestionService.deleteQuestion(testId, questionId);

  if (statusCode(response).noContent) {
    return { questionId, hasError: false };
  }

  return { hasError: true };
});

export const updateTestQuestion = createAsyncThunk("updateTestQuestion", async ({ testId, questionId, question }) => {
  const response = await testQuestionService.updateQuestion(testId, questionId, question);

  if (statusCode(response).ok) {
    const updatedQuestion = await response.json();
    return { updatedQuestion, hasError: false };
  }

  return { hasError: true };
});

export const moveTestQuestion = createAsyncThunk("moveTestQuestion", async ({ testId, indexes }) => {
  const response = await testQuestionService.moveQuestion(testId, indexes);

  if (statusCode(response).ok) {
    const questions = await response.json();
    return { questions, hasError: false };
  }

  return { hasError: true };
});

export const showDeleteTestQuestionModal = createAsyncThunk(
  "showDeleteTestQuestionModal",
  ({ testId, questionId }, thunkAPI) => {
    thunkAPI.dispatch(showModal(modalTypes.deleteTestQuestion, { testId, questionId }));
  }
);
