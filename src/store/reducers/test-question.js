import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault, onSavingDefault } from "./defaults";
import {
  fetchTestQuestions,
  createTestQuestion,
  deleteTestQuestion,
  selectTestQuestion,
  updateTestQuestion,
  moveTestQuestion,
  fetchNextTestQuestion,
  fetchPreviousTestQuestion,
} from "../actions/test-question";

const initialState = {
  questions: [],
  currentQuestion: null,
  selectedQuestion: null,
  isFetching: false,
  isSaving: false,
  hasError: false,
};

const testQuestionSlice = createSlice({
  name: "testQuestionSlice",
  initialState: initialState,
  extraReducers: {
    [fetchTestQuestions.pending]: (state) => {
      onPendingDefault(state);
      state.selectedQuestion = null;
    },
    [fetchTestQuestions.fulfilled]: (state, { payload: { questions, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.questions = questions;
      state.selectedQuestion = questions[0];
    },
    [fetchTestQuestions.rejected]: (state) => {
      onRejectedDefault(state);
      state.questions = [];
    },

    [createTestQuestion.pending]: (state) => {
      onSavingDefault(state);
    },
    [createTestQuestion.fulfilled]: (state, { payload: { createdQuestion, hasError } }) => {
      onFulfilledDefault(state, hasError);

      if (!hasError) {
        if (state.questions.length > 0) {
          state.questions[state.questions.length - 1].nextQuestionId = createdQuestion.id;
        }

        state.questions = [...state.questions, createdQuestion];
        state.selectedQuestion = createdQuestion;
      }
    },
    [createTestQuestion.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [deleteTestQuestion.pending]: (state) => {
      onSavingDefault(state);
    },
    [deleteTestQuestion.fulfilled]: (state, { payload: { questionId, hasError } }) => {
      onFulfilledDefault(state, hasError);

      if (!hasError) {
        const deletedQuestion = state.questions.find((q) => q.id === questionId);

        if (deletedQuestion.previousQuestionId) {
          const previousQuestion = state.questions.find((q) => q.id === deletedQuestion.previousQuestionId);
          previousQuestion.nextQuestionId = deletedQuestion.nextQuestionId;
        }

        if (deletedQuestion.nextQuestionId) {
          const nextQuestion = state.questions.find((q) => q.id === deletedQuestion.nextQuestionId);
          nextQuestion.previousQuestionId = deletedQuestion.previousQuestionId;
        }

        state.questions = state.questions.filter((question) => question.id !== questionId);

        if (state.selectedQuestion.id === questionId) {
          if (state.questions.length > 0) state.selectedQuestion = state.questions[0];
          else state.selectedQuestion = null;
        } else {
          state.selectedQuestion = state.questions.find((q) => q.id === state.selectedQuestion.id);
        }
      }
    },
    [deleteTestQuestion.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [updateTestQuestion.pending]: (state) => {
      onSavingDefault(state);
    },
    [updateTestQuestion.fulfilled]: (state, { payload: { updatedQuestion, hasError } }) => {
      onFulfilledDefault(state, hasError);

      if (!hasError) {
        state.selectedQuestion = updatedQuestion;
        state.questions = state.questions.map((question) =>
          question.id === updatedQuestion.id ? updatedQuestion : question
        );
      }
    },
    [updateTestQuestion.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [moveTestQuestion.pending]: (state) => {
      onSavingDefault(state);
    },
    [moveTestQuestion.fulfilled]: (state, { payload: { questions, hasError } }) => {
      onFulfilledDefault(state, hasError);

      if (!hasError) {
        state.questions = questions;
        state.selectedQuestion = questions.find((q) => q.id === state.selectedQuestion.id);
      }
    },
    [moveTestQuestion.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [fetchNextTestQuestion.pending]: (state) => {
      onPendingDefault(state);
    },
    [fetchNextTestQuestion.fulfilled]: (state, { payload: { question, hasError } }) => {
      onFulfilledDefault(state, hasError);

      if (!hasError) {
        state.currentQuestion = question;
      }
    },
    [fetchNextTestQuestion.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [fetchPreviousTestQuestion.pending]: (state) => {
      onPendingDefault(state);
    },
    [fetchPreviousTestQuestion.fulfilled]: (state, { payload: { question, hasError } }) => {
      onFulfilledDefault(state, hasError);

      if (!hasError) {
        state.currentQuestion = question;
      }
    },
    [fetchPreviousTestQuestion.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [selectTestQuestion.fulfilled]: (state, { payload: { question } }) => {
      state.selectedQuestion = question;
    },
  },
});

export default testQuestionSlice.reducer;
