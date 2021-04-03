import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault } from "./defaults";
import { fetchTestQuestions, createTestQuestion, deleteTestQuestion } from "../actions/test-question";

const initialState = {
    questions: [],
    selectedQuestion: null,
    isFetching: false,
    hasError: false
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
        },
        [fetchTestQuestions.rejected]: (state) => {
            onRejectedDefault(state);
            state.questions = [];
        },

        [createTestQuestion.pending]: (state) => {
            onPendingDefault(state);
        },
        [createTestQuestion.fulfilled]: (state, { payload: { question, hasError } }) => {
            onFulfilledDefault(state, hasError);

            if (!hasError) {
                state.questions = [question, ...state.questions];
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
                state.questions = state.questions.filter(question => question.id !== questionId);
            }
        },
        [deleteTestQuestion.rejected]: (state) => {
            onRejectedDefault(state);
        }
    }
});

export default testQuestionSlice.reducer;