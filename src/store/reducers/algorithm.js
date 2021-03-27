import { createSlice } from "@reduxjs/toolkit";
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
            state.isFetching = true;
        },
        [fetchAlgorithms.fulfilled]: (state, { payload: { algorithms, hasError } }) => {
            state.isFetching = false;
            state.algorithms = algorithms;
            state.hasError = hasError;
        },
        [fetchAlgorithms.rejected]: (state) => {
            state.isFetching = false;
            state.algorithms = [];
            state.hasError = true;
        }
    }
});

export default algorithmSlice.reducer;