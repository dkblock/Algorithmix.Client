import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault, onSavingDefault } from "./defaults";
import { clearAlgorithmImage, fetchAlgorithm, updateAlgorithm, uploadAlgorithmImage } from "../actions/algorithm";
import images from "../../constants/images";

const initialState = {
  algorithm: null,
  validationErrors: {},

  isFetching: false,
  isSaving: false,
  hasError: false,
};

const algorithmDesignSlice = createSlice({
  name: "algorithmDesignSlice",
  initialState: initialState,
  extraReducers: {
    [fetchAlgorithm.pending]: (state) => {
      onPendingDefault(state);
    },
    [fetchAlgorithm.fulfilled]: (state, { payload: { algorithm, hasError } }) => {
      onFulfilledDefault(state, hasError);
      state.algorithm = algorithm;
    },
    [fetchAlgorithm.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [updateAlgorithm.pending]: (state) => {
      onSavingDefault(state);
    },
    [updateAlgorithm.fulfilled]: (state, { payload: { updatedAlgorithm, validationErrors, hasError } }) => {
      onFulfilledDefault(state, hasError);

      if (!hasError) {
        state.algorithm = updatedAlgorithm;
      } else {
        state.validationErrors = validationErrors;
      }
    },
    [updateAlgorithm.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [uploadAlgorithmImage.pending]: (state) => {
      onSavingDefault(state);
    },
    [uploadAlgorithmImage.fulfilled]: (state, { payload: { updatedAlgorithm, hasError } }) => {
      onFulfilledDefault(state);
      if (hasError) return;

      state.algorithm = updatedAlgorithm;
    },
    [uploadAlgorithmImage.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [clearAlgorithmImage.pending]: (state) => {
      onSavingDefault(state);
    },
    [clearAlgorithmImage.fulfilled]: (state, { payload: { hasError } }) => {
      onFulfilledDefault(state);
      if (hasError) return;

      state.algorithm = { ...state.algorithm, imageUrl: images.algorithms.default };
    },
    [clearAlgorithmImage.rejected]: (state) => {
      onRejectedDefault(state);
    },
  },
});

export default algorithmDesignSlice.reducer;
