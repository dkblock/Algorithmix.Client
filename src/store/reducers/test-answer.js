import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault } from "./defaults";
import { fetchTestAnswers, createTestAnswer, deleteTestAnswer } from "../actions/test-answer";

const initialState = {
    answers: [],
    isFetching: false,
    hasError: false
};

const testAnswerSlice = createSlice({
    name: "testAnswerSlice",
    initialState: initialState,
    extraReducers: {
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
                state.answers = [answer, ...state.answers];
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
                state.answers = state.answers.filter(answer => answer.id !== answerId);
            }
        },
        [deleteTestAnswer.rejected]: (state) => {
            onRejectedDefault(state);
        }
    }
});

export default testAnswerSlice.reducer;