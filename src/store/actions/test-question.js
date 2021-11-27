import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTestAnswers } from "./test-answer";
import { hideModal, showModal } from "./modal";
import testQuestionService from "../../api/services/test-question-service";
import testQuestionTypes from "../../constants/test-question-types";
import statusCode from "../../utils/status-code-reader";
import modalTypes from "../../constants/modal-types";

export const fetchTestQuestions = createAsyncThunk("fetchTestQuestions", async ({ testId }) => {
  const response = await testQuestionService.fetchQuestions(testId);

  if (statusCode.ok(response)) {
    const questions = await response.json();
    return { questions, hasError: false };
  }

  return { questions: [], hasError: true };
});

export const fetchTestQuestion = createAsyncThunk("fetchTestQuestion", async ({ testId, questionId }, thunkAPI) => {
  const response = await testQuestionService.fetchQuestion(testId, questionId);

  if (statusCode.ok(response)) {
    const question = await response.json();
    const {
      payload: { answers, hasError },
    } = await thunkAPI.dispatch(fetchTestAnswers({ testId, questionId }));

    return { question, answers, hasError };
  }

  return { question: null, answers: [], hasError: true };
});

export const createTestQuestion = createAsyncThunk("createTestQuestion", async ({ testId, count }) => {
  const response = await testQuestionService.createQuestion(testId, {
    value: `Вопрос ${count + 1}`,
    type: testQuestionTypes.singleAnswerQuestion,
    testId,
  });

  if (statusCode.created(response)) {
    const createdQuestion = await response.json();
    return { createdQuestion, hasError: false };
  }

  return { hasError: true };
});

export const deleteTestQuestion = createAsyncThunk("deleteTestQuestion", async ({ testId, questionId }, thunkAPI) => {
  const response = await testQuestionService.deleteQuestion(testId, questionId);

  if (statusCode.noContent(response)) {
    thunkAPI.dispatch(hideModal());
    const { question: selectedQuestion } = thunkAPI.getState().testDesign;

    if (selectedQuestion.id === questionId) {
      const { test, questions } = thunkAPI.getState().testDesign;
      const newSelectedQuestion = questions.find((question) => question.id !== questionId);

      if (newSelectedQuestion) {
        thunkAPI.dispatch(fetchTestQuestion({ testId: test.id, questionId: newSelectedQuestion.id }));
      }
    }

    return { questionId, hasError: false };
  }

  return { hasError: true };
});

export const updateTestQuestion = createAsyncThunk(
  "updateTestQuestion",
  async ({ testId, questionId, question }, thunkAPI) => {
    const response = await testQuestionService.updateQuestion(testId, questionId, question);

    if (statusCode.ok(response)) {
      const { type } = thunkAPI.getState().testDesign.question;
      const updatedQuestion = await response.json();

      if (type !== updatedQuestion.type)
        thunkAPI.dispatch(updateTestQuestionType({ questionType: updatedQuestion.type }));

      return { updatedQuestion, hasError: false };
    }

    return { hasError: true };
  }
);

export const updateTestQuestionType = createAction("updateTestQuestionType", ({ questionType }) => ({
  payload: { questionType },
}));

export const moveTestQuestion = createAsyncThunk("moveTestQuestion", async ({ testId, indexes }) => {
  const response = await testQuestionService.moveQuestion(testId, indexes);

  if (statusCode.ok(response)) {
    const questions = await response.json();
    return { questions, hasError: false };
  }

  return { hasError: true };
});

export const uploadTestQuestionImage = createAsyncThunk(
  "uploadTestQuestionImage",
  async ({ testId, questionId, image }, thunkAPI) => {
    const response = await testQuestionService.uploadQuestionImage(testId, questionId, image);

    if (statusCode.ok(response)) {
      thunkAPI.dispatch(hideModal());

      const updatedQuestion = await response.json();
      return { updatedQuestion, hasError: false };
    }

    return { hasError: true };
  }
);

export const clearTestQuestionImage = createAsyncThunk("clearTestQuestionImage", async ({ testId, questionId }) => {
  const response = await testQuestionService.clearQuestionImage(testId, questionId);

  if (statusCode.noContent(response)) {
    return { questionId, hasError: false };
  }

  return { hasError: true };
});

export const showDeleteTestQuestionModal = createAsyncThunk(
  "showDeleteTestQuestionModal",
  ({ testId, questionId }, thunkAPI) => {
    thunkAPI.dispatch(showModal(modalTypes.deleteTestQuestion, { testId, questionId }));
  }
);

export const showUploadTestQuestionImageModal = createAsyncThunk(
  "showUploadTestQuestionImageModal",
  ({ testId, questionId }, thunkAPI) => {
    thunkAPI.dispatch(showModal(modalTypes.uploadTestQuestionImage, { testId, questionId }));
  }
);
