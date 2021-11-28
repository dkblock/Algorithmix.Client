import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault } from "./defaults";
import { fetchNextTestQuestion, fetchPreviousTestQuestion, fetchTestResult, startTestPass } from "../actions/test-pass";

const initialState = {
  currentTest: null,
  currentQuestion: null,
  testResult: null,
  userAnswers: {},
  questionOrder: 0,

  isStarted: false,
  isFetching: false,
  isHandlingResult: false,
  hasError: false,
};

const testPassSlice = createSlice({
  name: "testPassSlice",
  initialState: initialState,
  extraReducers: {
    [startTestPass.pending]: (state) => {
      onPendingDefault(state);
      state.currentQuestion = null;
      state.currentTest = null;
      state.testResult = null;
      state.userAnswers = {};
      state.questionOrder = 1;
      state.isStarted = false;
    },
    [startTestPass.fulfilled]: (state, { payload: { test, question, hasError } }) => {
      onFulfilledDefault(state);

      if (!hasError) {
        state.currentTest = test;
        state.currentQuestion = question;
        state.isStarted = true;
      }
    },
    [startTestPass.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [fetchNextTestQuestion.pending]: (state) => {
      onPendingDefault(state, "isHandlingResult");
    },
    [fetchNextTestQuestion.fulfilled]: (state, { payload: { userAnswer, question, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.isHandlingResult = false;

      if (!hasError && question) {
        state.currentQuestion = question;
        state.userAnswers = { ...state.userAnswers, [question.previousQuestionId]: userAnswer.answers };
        state.questionOrder++;
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
        state.questionOrder--;
      }
    },
    [fetchPreviousTestQuestion.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [fetchTestResult.pending]: (state) => {
      onPendingDefault(state);
      state.testResult = null;
    },
    [fetchTestResult.fulfilled]: (state, { payload: { testResult, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.testResult = testResult;
      state.currentQuestion = null;
      state.currentTest = null;
      state.userAnswers = {};
      state.isStarted = false;
    },
    [fetchTestResult.rejected]: (state) => {
      onRejectedDefault(state);
    },
  },
});

export default testPassSlice.reducer;
