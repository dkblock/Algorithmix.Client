import { createSlice } from "@reduxjs/toolkit";
import { fetchAlgorithms } from "./actions";

const initialState = {
    algorithms: []
};

const appSlice = createSlice({
    name: "appSlice",
    initialState: initialState,
    extraReducers: {
        [fetchAlgorithms.fulfilled]: (state, action) => {
            state.algorithms = action.payload;
        }
    }
});

export default appSlice.reducer;