import { createAsyncThunk } from "@reduxjs/toolkit";
import testQuestionService from "../../api/services/test-question-service";
import statusCode from "../../utils/status-code-reader";

export const fetchTestQuestions = createAsyncThunk("fetchTestQuestions", async (testId) => {
    const response = await testQuestionService.fetchQuestions(testId);

    if (statusCode(response).ok) {
        const questions = await response.json();
        return { questions, hasError: false };
    }

    return { questions: [], hasError: true };
});

export const createTestQuestion = createAsyncThunk("createTestQuestion", async ({ testId, question }) => {
    const response = await testQuestionService.createQuestion(testId, question);

    if (statusCode(response).created) {
        const createdQuestion = await response.json();
        return { question: createdQuestion, hasError: false };
    }

    return { hasError: true };
});

export const deleteTestQuestion = createAsyncThunk("deleteTestQuestion", async ({ testId, questionId }) => {
    const response = await testQuestionService.deleteQuestion(testId, questionId);

    if (statusCode(response).noContent)
        return { questionId, hasError: false };

    return { hasError: true };
});