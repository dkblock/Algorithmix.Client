import { createSlice } from "@reduxjs/toolkit";
import { onPendingDefault, onFulfilledDefault, onRejectedDefault, onSavingDefault } from "./defaults";
import {
  clearAlgorithmConstructor,
  clearAlgorithmDescription,
  clearAlgorithmImage,
  fetchAlgorithm,
  showUploadAlgorithmDataModal,
  updateAlgorithm,
  updateAlgorithmTimeComplexity,
  uploadAlgorithmConstructor,
  uploadAlgorithmDescription,
  uploadAlgorithmImage,
} from "../actions/algorithm";
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
        state.validationErrors = {};
      } else {
        state.validationErrors = validationErrors;
      }
    },
    [updateAlgorithm.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [updateAlgorithmTimeComplexity.pending]: (state) => {
      onSavingDefault(state);
    },
    [updateAlgorithmTimeComplexity.fulfilled]: (state, { payload: { updatedAlgorithmTimeComplexity, hasError } }) => {
      onFulfilledDefault(state, hasError);
      if (hasError) return;

      state.algorithm = { ...state.algorithm, timeComplexity: updatedAlgorithmTimeComplexity };
    },
    [updateAlgorithmTimeComplexity.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [uploadAlgorithmDescription.pending]: (state) => {
      onSavingDefault(state);
    },
    [uploadAlgorithmDescription.fulfilled]: (state, { payload: { hasError, validationErrors } }) => {
      onFulfilledDefault(state);

      if (!hasError) {
        state.algorithm = { ...state.algorithm, hasDescription: true };
        state.validationErrors = {};
      } else {
        state.validationErrors = validationErrors;
      }
    },
    [uploadAlgorithmDescription.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [clearAlgorithmDescription.pending]: (state) => {
      onSavingDefault(state);
    },
    [clearAlgorithmDescription.fulfilled]: (state, { payload: { hasError } }) => {
      onFulfilledDefault(state);
      if (hasError) return;

      state.algorithm = { ...state.algorithm, hasDescription: false };
    },
    [clearAlgorithmDescription.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [uploadAlgorithmConstructor.pending]: (state) => {
      onSavingDefault(state);
    },
    [uploadAlgorithmConstructor.fulfilled]: (state, { payload: { hasError, validationErrors } }) => {
      onFulfilledDefault(state);

      if (!hasError) {
        state.algorithm = { ...state.algorithm, hasConstructor: true };
        state.validationErrors = {};
      } else {
        state.validationErrors = validationErrors;
      }
    },
    [uploadAlgorithmConstructor.rejected]: (state) => {
      onRejectedDefault(state);
    },

    [clearAlgorithmConstructor.pending]: (state) => {
      onSavingDefault(state);
    },
    [clearAlgorithmConstructor.fulfilled]: (state, { payload: { hasError } }) => {
      onFulfilledDefault(state);
      if (hasError) return;

      state.algorithm = { ...state.algorithm, hasConstructor: false };
    },
    [clearAlgorithmConstructor.rejected]: (state) => {
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

    [showUploadAlgorithmDataModal.fulfilled]: (state) => {
      state.validationErrors = {};
    },
  },
});

export default algorithmDesignSlice.reducer;
