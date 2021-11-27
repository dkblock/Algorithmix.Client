import { onFulfilledDefault, onPendingDefault, onRejectedDefault, onSavingDefault } from "./defaults";
import {
  createTestAnswer,
  deleteTestAnswer,
  updateTestAnswer,
  moveTestAnswer,
  updateCorrectTestAnswer,
} from "../actions/test-answer";
import testQuestionTypes from "../../constants/test-question-types";
import { updateTestQuestionType } from "../actions/test-question";

const testAnswerDesignReducer = {
  [createTestAnswer.pending]: (state) => {
    onPendingDefault(state, "isAnswerCreating");
  },
  [createTestAnswer.fulfilled]: (state, { payload: { createdAnswer, hasError } }) => {
    onFulfilledDefault(state, hasError, "isAnswerCreating");
    if (hasError) return;

    const question = state.questions.find((question) => question.id === createdAnswer.question.id);
    const previousAnswer = state.answers.find((answer) => answer.id === createdAnswer.previousAnswerId);

    if (previousAnswer) {
      previousAnswer.nextAnswerId = createdAnswer.id;
    }

    state.test.isPublished = false;
    state.answers = [...state.answers, createdAnswer];
    question.answers = state.answers;
  },
  [createTestAnswer.rejected]: (state) => {
    onRejectedDefault(state, "isAnswerCreating");
  },

  [deleteTestAnswer.pending]: (state) => {
    onPendingDefault(state, "isAnswerDeleting");
  },
  [deleteTestAnswer.fulfilled]: (state, { payload: { answerId, hasError } }) => {
    onFulfilledDefault(state, hasError, "isAnswerDeleting");
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

    if (
      state.question.type === testQuestionTypes.singleAnswerQuestion &&
      deletedAnswer.isCorrect &&
      state.answers.length > 1
    ) {
      const newCorrectAnswer = state.answers.find((answer) => answer.id !== deletedAnswer.id);
      newCorrectAnswer.isCorrect = true;
    }

    state.answers = state.answers.filter((answer) => answer.id !== answerId);
    state.test.isPublished = false;
  },
  [deleteTestAnswer.rejected]: (state) => {
    onRejectedDefault(state, "isAnswerDeleting");
  },

  [updateTestAnswer.pending]: (state) => {
    onPendingDefault(state, "isAnswerUpdating");
  },
  [updateTestAnswer.fulfilled]: (state, { payload: { updatedAnswer, hasError } }) => {
    onFulfilledDefault(state, hasError, "isAnswerUpdating");
    if (hasError) return;

    state.test.isPublished = false;
    state.answers = state.answers.map((answer) => (answer.id === updatedAnswer.id ? updatedAnswer : answer));
  },
  [updateTestAnswer.rejected]: (state) => {
    onRejectedDefault(state, "isAnswerUpdating");
  },

  [updateCorrectTestAnswer]: (state, { payload: { answerId } }) => {
    updateCorrectAnswers(answerId, state);
  },

  [moveTestAnswer.pending]: (state) => {
    onPendingDefault(state, "isAnswerMoving");
  },
  [moveTestAnswer.fulfilled]: (state, { payload: { answers, hasError } }) => {
    onFulfilledDefault(state, hasError, "isAnswerMoving");
    if (hasError) return;

    state.answers = answers;
    state.test.isPublished = false;
  },
  [moveTestAnswer.rejected]: (state) => {
    onRejectedDefault(state, "isAnswerMoving");
  },

  [updateTestQuestionType]: (state, { payload: { questionType } }) => {
    state.answers = state.answers.map((answer) => ({ ...answer, isCorrect: false }));

    switch (questionType) {
      case testQuestionTypes.freeAnswerQuestion:
        if (state.answers[0]) state.answers[0] = { ...state.answers[0], isCorrect: true };
        break;
      case testQuestionTypes.singleAnswerQuestion:
        if (state.answers[0]) state.answers[0] = { ...state.answers[0], isCorrect: true };
        break;
      case testQuestionTypes.multiAnswerQuestion:
        break;
      default:
        break;
    }
  },
};

const updateCorrectAnswers = (answerId, state) => {
  switch (state.question.type) {
    case testQuestionTypes.freeAnswerQuestion:
      state.answers = state.answers.map((answer) => (answer.id === answerId ? { ...answer, isCorrect: true } : answer));
      break;
    case testQuestionTypes.singleAnswerQuestion:
      state.answers = state.answers.map((answer) =>
        answer.id === answerId ? { ...answer, isCorrect: true } : { ...answer, isCorrect: false }
      );
      break;
    case testQuestionTypes.multiAnswerQuestion:
      state.answers = state.answers.map((answer) => (answer.id === answerId ? { ...answer, isCorrect: true } : answer));
      break;
    default:
      break;
  }
};

export default testAnswerDesignReducer;
