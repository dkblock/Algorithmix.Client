import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault } from "./defaults";
import {
  fetchTestQuestions,
  createTestQuestion,
  deleteTestQuestion,
  selectTestQuestion,
} from "../actions/test-question";

const initialState = {
  questions: [],
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
      onPendingDefault(state);
    },
    [createTestQuestion.fulfilled]: (state, { payload: { createdQuestion, hasError } }) => {
      onFulfilledDefault(state, hasError);

      if (!hasError) {
        state.questions = [...state.questions, createdQuestion];
      }
    },
    [createTestQuestion.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [deleteTestQuestion.pending]: (state) => {
      onPendingDefault(state);
    },
    [deleteTestQuestion.fulfilled]: (state, { payload: { questionId, hasError } }) => {
      onFulfilledDefault(state, hasError);

      if (!hasError) {
        state.questions = state.questions.filter((question) => question.id !== questionId);

        if (state.questions.length > 0 && state.selectedQuestion.id === questionId) {
          state.selectedQuestion = state.questions[0];
        } else {
          state.selectedQuestion = null;
        }
      }
    },
    [deleteTestQuestion.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [selectTestQuestion]: (state, { payload: { question } }) => {
      state.selectedQuestion = question;
    },
  },
});

export default testQuestionSlice.reducer;
