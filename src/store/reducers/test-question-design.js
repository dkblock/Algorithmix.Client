import { onPendingDefault, onFulfilledDefault, onRejectedDefault, onSavingDefault } from "./defaults";
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
    onSavingDefault(state);
  },
  [createTestQuestion.fulfilled]: (state, { payload: { createdQuestion, hasError } }) => {
    onFulfilledDefault(state, hasError);
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
    onRejectedDefault(state);
  },

  [deleteTestQuestion.pending]: (state) => {
    onSavingDefault(state);
  },
  [deleteTestQuestion.fulfilled]: (state, { payload: { questionId, hasError } }) => {
    onFulfilledDefault(state, hasError);
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

    state.questions = state.questions.filter((question) => question.id !== questionId);
    state.question = state.questions[0];
    state.answers = state.question?.answers ?? [];
    state.test.isPublished = false;
  },
  [deleteTestQuestion.rejected]: (state) => {
    onRejectedDefault(state);
  },

  [updateTestQuestion.pending]: (state) => {
    onSavingDefault(state);
  },
  [updateTestQuestion.fulfilled]: (state, { payload: { updatedQuestion, hasError } }) => {
    onFulfilledDefault(state, hasError);
    if (hasError) return;

    state.question = updatedQuestion;
    state.questions = state.questions.map((question) =>
      question.id === updatedQuestion.id ? updatedQuestion : question
    );
    state.test.isPublished = false;
  },
  [updateTestQuestion.rejected]: (state) => {
    onRejectedDefault(state);
  },

  [uploadTestQuestionImage.pending]: (state) => {
    onSavingDefault(state);
  },
  [uploadTestQuestionImage.fulfilled]: (state, { payload: { updatedQuestion, hasError } }) => {
    onFulfilledDefault(state);
    if (hasError) return;

    state.question = updatedQuestion;
    state.questions = state.questions.map((question) =>
      question.id === updatedQuestion.id ? updatedQuestion : question
    );
    state.test.isPublished = false;
  },
  [uploadTestQuestionImage.rejected]: (state) => {
    onRejectedDefault(state);
  },

  [clearTestQuestionImage.pending]: (state) => {
    onSavingDefault(state);
  },
  [clearTestQuestionImage.fulfilled]: (state, { payload: { questionId, hasError } }) => {
    onFulfilledDefault(state);
    if (hasError) return;

    const updatedQuestion = { ...state.question, image: null };

    state.question = updatedQuestion;
    state.questions = state.questions.map((question) => (question.id === questionId ? updatedQuestion : question));
    state.test.isPublished = false;
  },
  [clearTestQuestionImage.rejected]: (state) => {
    onRejectedDefault(state);
  },

  [moveTestQuestion.pending]: (state) => {
    onSavingDefault(state);
  },
  [moveTestQuestion.fulfilled]: (state, { payload: { questions, hasError } }) => {
    onFulfilledDefault(state, hasError);
    if (hasError) return;

    state.questions = questions;
    state.question = questions.find((question) => question.id === state.question.id);
    state.test.isPublished = false;
  },
  [moveTestQuestion.rejected]: (state) => {
    onRejectedDefault(state);
  },
};

export default testQuestionDesignReducer;
