import { createAsyncThunk } from "@reduxjs/toolkit";
import testAnswerService from "../../api/services/test-answer-service";
import statusCode from "../../utils/status-code-reader";

export const fetchTestAnswers = createAsyncThunk("fetchTestAnswers", async ({ testId, questionId }) => {
  const response = await testAnswerService.fetchAnswers(testId, questionId);

  if (statusCode(response).ok) {
    const answers = await response.json();
    return { answers, hasError: false };
  }

  return { answers: [], hasError: true };
});

export const createTestAnswer = createAsyncThunk("createTestAnswer", async ({ testId, questionId, count }) => {
  const response = await testAnswerService.createAnswer(testId, questionId, {
    value: `Ответ ${count + 1}`,
    isCorrect: false,
    questionId,
  });

  if (statusCode(response).created) {
    const createdAnswer = await response.json();
    return { answer: createdAnswer, hasError: false };
  }

  return { hasError: true };
});

export const deleteTestAnswer = createAsyncThunk("deleteTestAnswer", async ({ testId, questionId, answerId }) => {
  const response = await testAnswerService.deleteAnswer(testId, questionId, answerId);

  if (statusCode(response).noContent) return { answerId, hasError: false };

  return { hasError: true };
});