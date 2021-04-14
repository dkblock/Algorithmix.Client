import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault } from "./defaults";
import {
  fetchTestAnswers,
  createTestAnswer,
  deleteTestAnswer,
  updateTestAnswer,
  moveTestAnswer,
} from "../actions/test-answer";
import { fetchTestQuestions } from "../actions/test-question";

const initialState = {
  answers: [],
  isFetching: false,
  hasError: false,
};

const testAnswerSlice = createSlice({
  name: "testAnswerSlice",
  initialState: initialState,
  extraReducers: {
    [fetchTestQuestions.fulfilled]: (state, { payload: { questions } }) => {
      if (questions.length > 0) {
        state.answers = questions[0].answers;
      }
    },

    [fetchTestAnswers.pending]: (state) => {
      onPendingDefault(state);
    },
    [fetchTestAnswers.fulfilled]: (state, { payload: { answers, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.answers = answers;
    },
    [fetchTestAnswers.rejected]: (state) => {
      onRejectedDefault(state);
      state.answers = [];
    },

    [createTestAnswer.pending]: (state) => {
      onPendingDefault(state);
    },
    [createTestAnswer.fulfilled]: (state, { payload: { answer, hasError } }) => {
      onFulfilledDefault(state, hasError);

      if (!hasError) {
        state.answers = [...state.answers, answer];
      }
    },
    [createTestAnswer.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [deleteTestAnswer.pending]: (state) => {
      onPendingDefault(state);
    },
    [deleteTestAnswer.fulfilled]: (state, { payload: { answerId, hasError } }) => {
      onFulfilledDefault(state, hasError);

      if (!hasError) {
        state.answers = state.answers.filter((answer) => answer.id !== answerId);
      }
    },
    [deleteTestAnswer.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [updateTestAnswer.pending]: (state) => {
      state.isSaving = true;
    },
    [updateTestAnswer.fulfilled]: (state, { payload: { updatedAnswer, hasError } }) => {
      state.isSaving = false;

      if (!hasError) {
        state.answers = state.answers.map((answer) => (answer.id === updatedAnswer.id ? updatedAnswer : answer));
      }
    },
    [updateTestAnswer.rejected]: (state) => {
      onRejectedDefault(state);
      state.isSaving = false;
    },

    [moveTestAnswer.pending]: (state) => {
      state.isSaving = true;
    },
    [moveTestAnswer.fulfilled]: (state, { payload: { answers, hasError } }) => {
      if (!hasError) {
        state.answers = answers;
        state.isSaving = false;
      }
    },
    [moveTestAnswer.rejected]: (state) => {
      onRejectedDefault(state);
      state.isSaving = false;
    },
  },
});

export default testAnswerSlice.reducer;
