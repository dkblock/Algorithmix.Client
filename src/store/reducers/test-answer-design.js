import { onFulfilledDefault, onRejectedDefault, onSavingDefault } from "./defaults";
import { createTestAnswer, deleteTestAnswer, updateTestAnswer, moveTestAnswer } from "../actions/test-answer";
import testQuestionTypes from "../../constants/test-question-types";

const testAnswerDesignReducer = {
  [createTestAnswer.pending]: (state) => {
    onSavingDefault(state);
  },
  [createTestAnswer.fulfilled]: (state, { payload: { createdAnswer, hasError } }) => {
    onFulfilledDefault(state, hasError);
    if (hasError) return;

    const previousAnswer = state.answers.find((answer) => answer.id === createdAnswer.previousAnswerId);

    if (previousAnswer) {
      previousAnswer.nextAnswerId = createdAnswer.id;
    }

    state.answers = [...state.answers, createdAnswer];
  },
  [createTestAnswer.rejected]: (state) => {
    onRejectedDefault(state);
  },

  [deleteTestAnswer.pending]: (state) => {
    onSavingDefault(state);
  },
  [deleteTestAnswer.fulfilled]: (state, { payload: { answerId, hasError } }) => {
    onFulfilledDefault(state, hasError);
    if (hasError) return;

    const deletedAnswer = state.answers.find((answer) => answer.id === answerId);

    if (deletedAnswer.previousAnswerId) {
      const previousAnswer = state.answers.find((answer) => answer.id === deletedAnswer.previousAnswerId);
      previousAnswer.nextAnswerId = deletedAnswer.nextAnswerId;
    }

    if (deletedAnswer.nextAnswerId) {
      const nextAnswer = state.answers.find((answer) => answer.id === deletedAnswer.nextAnswerId);
      nextAnswer.previousAnswerId = deletedAnswer.previousAnswerId;
    }

    state.answers = state.answers.filter((answer) => answer.id !== answerId);
  },
  [deleteTestAnswer.rejected]: (state) => {
    onRejectedDefault(state);
  },

  [updateTestAnswer.pending]: (state) => {
    onSavingDefault(state);
  },
  [updateTestAnswer.fulfilled]: (state, { payload: { updatedAnswer, hasError } }) => {
    onFulfilledDefault(state, hasError);
    if (hasError) return;

    updateCorrectAnswers(updatedAnswer, state);
  },
  [updateTestAnswer.rejected]: (state) => {
    onRejectedDefault(state);
  },

  [moveTestAnswer.pending]: (state) => {
    onSavingDefault(state);
  },
  [moveTestAnswer.fulfilled]: (state, { payload: { answers, hasError } }) => {
    onFulfilledDefault(state, hasError);
    if (hasError) return;

    state.answers = answers;
  },
  [moveTestAnswer.rejected]: (state) => {
    onRejectedDefault(state);
  },
};

const updateCorrectAnswers = (updatedAnswer, state) => {
  switch (updatedAnswer.question.type) {
    case testQuestionTypes.singleAnswerQuestion:
      state.answers = state.answers.map((answer) => {
        if (answer.id === updatedAnswer.id) return updatedAnswer;
        if (updatedAnswer.isCorrect) return { ...answer, isCorrect: false };
        return answer;
      });
      break;
    case testQuestionTypes.multiAnswerQuestion:
      state.answers = state.answers.map((answer) => (answer.id === updatedAnswer.id ? updatedAnswer : answer));
      break;
    case testQuestionTypes.freeAnswerQuestion:
      state.answers = state.answers.map((answer) => (answer.id === updatedAnswer.id ? updatedAnswer : answer));
      break;
    default:
      break;
  }
};

export default testAnswerDesignReducer;
