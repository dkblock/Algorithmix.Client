import { createAsyncThunk } from "@reduxjs/toolkit";
import algorithmService from "../../api/services/algorithm-service";
import { navigateToAlgorithmDesign } from "../../utils/navigator";
import statusCode from "../../utils/status-code-reader";
import { hideModal, showModal } from "./modal";
import modalTypes from "../../constants/modal-types";

export const fetchAlgorithms = createAsyncThunk("fetchAlgorithms", async () => {
  const response = await algorithmService.fetchAlgorithms();

  if (statusCode.ok(response)) {
    const algorithms = await response.json();
    return { algorithms, hasError: false };
  }

  return { algorithms: [], hasError: true };
});

export const fetchAlgorithm = createAsyncThunk("fetchAlgorithm", async ({ algorithmId }) => {
  const response = await algorithmService.fetchAlgorithm(algorithmId);

  if (statusCode.ok(response)) {
    const algorithm = await response.json();
    return { algorithm, hasError: false };
  }

  return { algorithm: null, hasError: true };
});

export const createAlgorithm = createAsyncThunk("createAlgorithm", async ({ algorithm }, thunkAPI) => {
  const response = await algorithmService.createAlgorithm(algorithm);

  if (statusCode.created(response)) {
    thunkAPI.dispatch(hideModal());
    const createdAlgorithm = await response.json();

    navigateToAlgorithmDesign(createdAlgorithm.id);
    return { createdAlgorithm, hasError: false };
  }

  if (statusCode.badRequest(response)) {
    const { validationErrors: errors } = await response.json();
    const validationErrors = {};
    errors.forEach((error) => (validationErrors[error.field] = error.message));

    return { validationErrors, hasError: true };
  }

  return { validationErrors: {}, hasError: true };
});

export const deleteAlgorithm = createAsyncThunk("deleteAlgorithm", async ({ algorithmId }, thunkAPI) => {
  const response = await algorithmService.deleteAlgorithm(algorithmId);

  if (statusCode.noContent(response)) {
    thunkAPI.dispatch(hideModal());
    return { algorithmId, hasError: false };
  }

  return { hasError: true };
});

export const updateAlgorithm = createAsyncThunk("updateAlgorithm", async ({ algorithmId, algorithm }) => {
  const response = await algorithmService.updateAlgorithm(algorithmId, algorithm);

  if (statusCode.ok(response)) {
    const updatedAlgorithm = await response.json();
    return { updatedAlgorithm, hasError: false };
  }

  if (statusCode.badRequest(response)) {
    const { validationErrors: errors } = await response.json();
    const validationErrors = {};
    errors.forEach((error) => (validationErrors[error.field] = error.message));

    return { validationErrors, hasError: true };
  }

  return { hasError: true };
});

export const uploadAlgorithmImage = createAsyncThunk(
  "uploadAlgorithmImage",
  async ({ algorithmId, image }, thunkAPI) => {
    const response = await algorithmService.uploadAlgorithmImage(algorithmId, image);

    if (statusCode.ok(response)) {
      thunkAPI.dispatch(hideModal());

      const updatedAlgorithm = await response.json();
      return { updatedAlgorithm, hasError: false };
    }

    return { hasError: true };
  }
);

export const clearAlgorithmImage = createAsyncThunk("clearAlgorithmImage", async ({ algorithmId }) => {
  const response = await algorithmService.clearAlgorithmImage(algorithmId);

  if (statusCode.noContent(response)) {
    return { hasError: false };
  }

  return { hasError: true };
});

export const showCreateAlgorithmModal = createAsyncThunk("showCreateAlgorithmModal", async (_, thunkAPI) => {
  thunkAPI.dispatch(showModal(modalTypes.createAlgorithm));
});

export const showDeleteAlgorithmModal = createAsyncThunk(
  "showDeleteAlgorithmModal",
  async ({ algorithm }, thunkAPI) => {
    thunkAPI.dispatch(showModal(modalTypes.deleteAlgorithm, { algorithm }));
  }
);

export const showUploadAlgorithmImageModal = createAsyncThunk(
  "showUploadAlgorithmImageModal",
  async ({ algorithmId }, thunkAPI) => {
    thunkAPI.dispatch(showModal(modalTypes.uploadAlgorithmImage, { algorithmId }));
  }
);
