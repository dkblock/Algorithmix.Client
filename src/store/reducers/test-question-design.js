import { onPendingDefault, onFulfilledDefault, onRejectedDefault } from "./defaults";
import {
  createTestQuestion,
  deleteTestQuestion,
  updateTestQuestion,
  moveTestQuestion,
  uploadTestQuestionImage,
  clearTestQuestionImage,
  fetchTestQuestion,
} from "../actions/test-question";

const testQuestionDesignReducer = {
  [fetchTestQuestion.pending]: (state) => {
    onPendingDefault(state, "isQuestionFetching");
  },
  [fetchTestQuestion.fulfilled]: (state, { payload: { question, answers, hasError } }) => {
    onFulfilledDefault(state, hasError, "isQuestionFetching");
    state.question = question;
    state.answers = answers;
  },
  [fetchTestQuestion.rejected]: (state) => {
    onRejectedDefault(state, "isQuestionFetching");
  },

  [createTestQuestion.pending]: (state) => {
    onPendingDefault(state, "isQuestionCreating");
  },
  [createTestQuestion.fulfilled]: (state, { payload: { createdQuestion, hasError } }) => {
    onFulfilledDefault(state, hasError, "isQuestionCreating");
    if (hasError) return;

    const previousQuestion = state.questions.find((question) => question.id === createdQuestion.previousQuestionId);

    if (previousQuestion) {
      previousQuestion.nextQuestionId = createdQuestion.id;
    }

    state.questions = [...state.questions, createdQuestion];
    state.question = createdQuestion;
    state.answers = [];
    state.test.isPublished = false;
  },
  [createTestQuestion.rejected]: (state) => {
    onRejectedDefault(state, "isQuestionCreating");
  },

  [deleteTestQuestion.pending]: (state) => {
    onPendingDefault(state, "isQuestionDeleting");
  },
  [deleteTestQuestion.fulfilled]: (state, { payload: { questionId, hasError } }) => {
    onFulfilledDefault(state, hasError, "isQuestionDeleting");
    if (hasError) return;

    const deletedQuestion = state.questions.find((question) => question.id === questionId);

    if (deletedQuestion.previousQuestionId) {
      const previousQuestion = state.questions.find((question) => question.id === deletedQuestion.previousQuestionId);
      previousQuestion.nextQuestionId = deletedQuestion.nextQuestionId;
    }

    if (deletedQuestion.nextQuestionId) {
      const nextQuestion = state.questions.find((question) => question.id === deletedQuestion.nextQuestionId);
      nextQuestion.previousQuestionId = deletedQuestion.previousQuestionId;
    }

    if (state.questions.length === 1) {
      state.question = null;
      state.questions = [];
      state.answers = [];
    }

    state.questions = state.questions.filter((question) => question.id !== questionId);
    state.test.isPublished = false;
  },
  [deleteTestQuestion.rejected]: (state) => {
    onRejectedDefault(state, "isQuestionDeleting");
  },

  [updateTestQuestion.pending]: (state) => {
    onPendingDefault(state, "isQuestionUpdating");
  },
  [updateTestQuestion.fulfilled]: (state, { payload: { updatedQuestion, hasError } }) => {
    onFulfilledDefault(state, hasError, "isQuestionUpdating");
    if (hasError) return;

    state.question = updatedQuestion;
    state.questions = state.questions.map((question) =>
      question.id === updatedQuestion.id ? updatedQuestion : question
    );
    state.test.isPublished = false;
  },
  [updateTestQuestion.rejected]: (state) => {
    onRejectedDefault(state, "isQuestionUpdating");
  },

  [uploadTestQuestionImage.pending]: (state) => {
    onPendingDefault(state, "isQuestionImageUpdating");
  },
  [uploadTestQuestionImage.fulfilled]: (state, { payload: { updatedQuestion, hasError } }) => {
    onFulfilledDefault(state, hasError, "isQuestionImageUpdating");
    if (hasError) return;

    state.question = updatedQuestion;
    state.questions = state.questions.map((question) =>
      question.id === updatedQuestion.id ? updatedQuestion : question
    );
    state.test.isPublished = false;
  },
  [uploadTestQuestionImage.rejected]: (state) => {
    onRejectedDefault(state, "isQuestionImageUpdating");
  },

  [clearTestQuestionImage.pending]: (state) => {
    onPendingDefault(state, "isQuestionImageUpdating");
  },
  [clearTestQuestionImage.fulfilled]: (state, { payload: { questionId, hasError } }) => {
    onFulfilledDefault(state, hasError, "isQuestionImageUpdating");
    if (hasError) return;

    const updatedQuestion = { ...state.question, image: null };

    state.question = updatedQuestion;
    state.questions = state.questions.map((question) => (question.id === questionId ? updatedQuestion : question));
    state.test.isPublished = false;
  },
  [clearTestQuestionImage.rejected]: (state) => {
    onRejectedDefault(state, "isQuestionImageUpdating");
  },

  [moveTestQuestion.pending]: (state) => {
    onPendingDefault(state, "isQuestionMoving");
  },
  [moveTestQuestion.fulfilled]: (state, { payload: { questions, hasError } }) => {
    onFulfilledDefault(state, hasError, "isQuestionMoving");
    if (hasError) return;

    state.questions = questions;
    state.question = questions.find((question) => question.id === state.question.id);
    state.test.isPublished = false;
  },
  [moveTestQuestion.rejected]: (state) => {
    onRejectedDefault(state, "isQuestionMoving");
  },
};

export default testQuestionDesignReducer;
