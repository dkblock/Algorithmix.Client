import { createSlice } from "@reduxjs/toolkit";
import { fetchAlgorithms } from "./actions";

const initialState = {
    algorithms: [],
    isFetching: false,
    header: "Главная"
};

const appSlice = createSlice({
    name: "appSlice",
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

export default appSlice.reducer;