import { createSlice } from "@reduxjs/toolkit";
import { fetchAlgorithms } from "../actions/algorithms";

const initialState = {
    algorithms: [],
    isFetching: false
};

const algorithmsSlice = createSlice({
    name: "algorithmsSlice",
    initialState: initialState,
    extraReducers: {
        [fetchAlgorithms.pending]: (state) => {
            state.isFetching = true;
        },
        [fetchAlgorithms.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.algorithms = action.payload;
        }
    }
});

export default algorithmsSlice.reducer;