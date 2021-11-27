import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault, onSavingDefault } from "./defaults";
import { fetchTest, publishTest, showPublishTestModal, updateTest } from "../actions/test";
import testAnswerDesignReducer from "./test-answer-design";
import testQuestionDesignReducer from "./test-question-design";

const initialState = {
  test: null,
  question: null,
  questions: [],
  answers: [],
  publishErrors: [],

  isTestUpdating: false,

  isQuestionFetching: false,
  isQuestionCreating: false,
  isQuestionDeleting: false,
  isQuestionUpdating: false,
  isQuestionImageUpdating: false,
  isQuestionMoving: false,

  isAnswerCreating: false,
  isAnswerDeleting: false,
  isAnswerUpdating: false,
  isAnswerMoving: false,

  isPublishing: false,
  isFetching: false,
  isSaving: false,
  hasError: false,
};

const testDesignSlice = createSlice({
  name: "testDesignSlice",
  initialState: initialState,
  extraReducers: {
    [fetchTest.pending]: (state) => {
      onPendingDefault(state);

      state.test = null;
      state.question = null;
      state.question = [];
    },
    [fetchTest.fulfilled]: (state, { payload: { test, question, questions, answers, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.test = test;
      state.question = question;
      state.questions = questions;
      state.answers = answers;
    },
    [fetchTest.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [updateTest.pending]: (state) => {
      onPendingDefault(state, "isTestUpdating");
    },
    [updateTest.fulfilled]: (state, { payload: { updatedTest, hasError } }) => {
      onFulfilledDefault(state, hasError, "isTestUpdating");
      if (hasError) return;

      state.test = updatedTest;
    },
    [updateTest.rejected]: (state) => {
      onRejectedDefault(state, "isTestUpdating");
    },

    [publishTest.pending]: (state) => {
      state.isPublishing = true;
    },
    [publishTest.fulfilled]: (state, { payload: { publishErrors, isPublished, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.isPublishing = false;
      state.publishErrors = publishErrors;
      state.test.isPublished = isPublished;
    },
    [publishTest.rejected]: (state) => {
      onRejectedDefault(state);
      state.isPublishing = false;
      state.publishErrors = [];
    },

    [showPublishTestModal.pending]: (state) => {
      state.publishErrors = [];
    },

    ...testAnswerDesignReducer,
    ...testQuestionDesignReducer,
  },
});

export default testDesignSlice.reducer;
