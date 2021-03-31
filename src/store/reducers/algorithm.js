import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault } from "./defaults";
import { fetchAlgorithms } from "../actions/algorithm";

const initialState = {
    algorithms: [],
    isFetching: false,
    hasError: false
};

const algorithmSlice = createSlice({
    name: "algorithmSlice",
    initialState: initialState,
    extraReducers: {
        [fetchAlgorithms.pending]: (state) => {
            onPendingDefault(state);
        },
        [fetchAlgorithms.fulfilled]: (state, { payload: { algorithms, hasError } }) => {
            onFulfilledDefault(state, hasError);
            state.algorithms = algorithms;
        },
        [fetchAlgorithms.rejected]: (state) => {
            onRejectedDefault(state);
            state.algorithms = [];
        }
    }
});

export default algorithmSlice.reducer;