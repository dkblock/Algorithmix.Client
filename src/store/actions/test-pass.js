import { createAsyncThunk } from "@reduxjs/toolkit";
import testService from "../../api/services/test-service";
import testQuestionService from "../../api/services/test-question-service";
import statusCode from "../../utils/status-code-reader";
import { navigateToTestResult } from "../../utils/navigator";

export const startTestPass = createAsyncThunk("startTestPass", async ({ testId }) => {
  const testResponse = await testService.fetchPublishedTest(testId);
  const questionResponse = await testService.startTestPass(testId);

  if (statusCode.ok(testResponse) && statusCode.ok(questionResponse)) {
    const currentTest = await testResponse.json();
    const firstQuestion = await questionResponse.json();

    return { test: currentTest, question: firstQuestion, hasError: false };
  }

  return { hasError: true };
});

export const fetchNextTestQuestion = createAsyncThunk("fetchNextTestQuestion", async ({ testId, userAnswer }) => {
  const response = await testQuestionService.fetchNextQuestion(testId, userAnswer);

  if (statusCode.ok(response)) {
    const nextQuestion = await response.json();
    return { userAnswer, question: nextQuestion, hasError: false };
  }

  if (statusCode.noContent(response)) {
    navigateToTestResult(testId);
    return { question: null, hasError: false };
  }

  return { hasError: true };
});

export const fetchPreviousTestQuestion = createAsyncThunk(
  "fetchPreviousTestQuestion",
  async ({ testId, currentQuestionId }) => {
    const response = await testQuestionService.fetchPreviousQuestion(testId, { questionId: currentQuestionId });

    if (statusCode.ok(response)) {
      const previousQuestion = await response.json();
      return { question: previousQuestion, hasError: false };
    }

    return { hasError: true };
  }
);

export const fetchTestResult = createAsyncThunk("fetchTestResult", async ({ testId }) => {
  const response = await testService.fetchTestResult(testId);

  if (statusCode.ok(response)) {
    const testResult = await response.json();
    return { testResult, hasError: false };
  }

  return { hasError: true };
});
