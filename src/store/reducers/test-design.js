import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault } from "./defaults";
import { fetchTest } from "../actions/test";
import testAnswerDesignReducer from "./test-answer-design";
import testQuestionDesignReducer from "./test-question-design";

const initialState = {
  test: null,
  question: null,
  questions: [],
  answers: [],

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

    ...testAnswerDesignReducer,
    ...testQuestionDesignReducer,
  },
});

export default testDesignSlice.reducer;
