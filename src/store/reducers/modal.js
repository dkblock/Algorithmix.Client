import { createSlice } from "@reduxjs/toolkit";
import { showModal, hideModal } from "../actions/modal";

const initialState = {
    modalType: null
};

const modalSlice = createSlice({
    name: "modalSlice",
    initialState: initialState,
    extraReducers: {
        [showModal]: (state, { payload: { modalType } }) => {
            state.modalType = modalType;
        },
        [hideModal]: (state) => {
            state.modalType = null;
        }
    }
});

export default modalSlice.reducer;