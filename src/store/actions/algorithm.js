import { createAsyncThunk } from "@reduxjs/toolkit";
import algorithmService from "../../api/services/algorithm-service";
import { navigateToAlgorithmDesign } from "../../utils/navigator";
import statusCode from "../../utils/status-code-reader";
import { hideModal, showModal } from "./modal";
import modalTypes from "../../constants/modal-types";
import { algorithmFetchParams } from "../reducers/default-states";

export const fetchAllAlgorithms = createAsyncThunk("fetchAllAlgorithms", async (_, thunkAPI) => {
  await thunkAPI.dispatch(fetchAlgorithms(algorithmFetchParams));
});

export const fetchAlgorithms = createAsyncThunk(
  "fetchAlgorithms",
  async ({ searchText, onlyAccessible, pageIndex, pageSize, sortBy, sortDirection }) => {
    const response = await algorithmService.fetchAlgorithms(
      searchText,
      onlyAccessible,
      pageIndex,
      pageSize,
      sortBy,
      sortDirection
    );

    if (statusCode.ok(response)) {
      const { page: algorithms, totalCount } = await response.json();
      return { algorithms, totalCount, hasError: false };
    }

    return { algorithms: [], totalCount: 0, hasError: true };
  }
);

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

export const updateAlgorithmTimeComplexity = createAsyncThunk(
  "updateAlgorithmTimeComplexity",
  async ({ algorithmId, timeComplexity }) => {
    const response = await algorithmService.updateAlgorithmTimeComplexity(algorithmId, timeComplexity);

    if (statusCode.ok(response)) {
      const updatedAlgorithmTimeComplexity = await response.json();
      return { updatedAlgorithmTimeComplexity, hasError: false };
    }

    return { hasError: true };
  }
);

export const uploadAlgorithmDescription = createAsyncThunk(
  "uploadAlgorithmDescription",
  async ({ algorithmId, description }, thunkAPI) => {
    const response = await algorithmService.uploadAlgorithmDescription(algorithmId, description);
    return await processAlgorithmDataUpload(response, thunkAPI);
  }
);

export const clearAlgorithmDescription = createAsyncThunk(
  "clearAlgorithmDescription",
  async ({ algorithmId, downloadBeforeDelete }, thunkAPI) => {
    if (downloadBeforeDelete) {
      await algorithmService.downloadAlgorithmDescription(algorithmId);
    }

    const response = await algorithmService.clearAlgorithmDescription(algorithmId);
    return await processAlgorithmDataClear(response, thunkAPI);
  }
);

export const downloadAlgorithmDescription = createAsyncThunk(
  "downloadAlgorithmDescription",
  async ({ algorithmId }) => {
    await algorithmService.downloadAlgorithmDescription(algorithmId);
  }
);

export const uploadAlgorithmConstructor = createAsyncThunk(
  "uploadAlgorithmConstructor",
  async ({ algorithmId, constructor }, thunkAPI) => {
    const response = await algorithmService.uploadAlgorithmConstructor(algorithmId, constructor);
    return await processAlgorithmDataUpload(response, thunkAPI);
  }
);

export const clearAlgorithmConstructor = createAsyncThunk(
  "clearAlgorithmConstructor",
  async ({ algorithmId, downloadBeforeDelete }, thunkAPI) => {
    if (downloadBeforeDelete) {
      await algorithmService.downloadAlgorithmConstructor(algorithmId);
    }

    const response = await algorithmService.clearAlgorithmConstructor(algorithmId);
    return await processAlgorithmDataClear(response, thunkAPI);
  }
);

export const downloadAlgorithmConstructor = createAsyncThunk(
  "downloadAlgorithmConstructor",
  async ({ algorithmId }) => {
    await algorithmService.downloadAlgorithmConstructor(algorithmId);
  }
);

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

export const downloadAlgorithmDataTemplate = createAsyncThunk(
  "downloadAlgorithmDataTemplate",
  async ({ algorithmId }) => {
    await algorithmService.downloadAlgorithmDataTemplate(algorithmId);
  }
);

export const showCreateAlgorithmModal = createAsyncThunk("showCreateAlgorithmModal", async (_, thunkAPI) => {
  thunkAPI.dispatch(showModal(modalTypes.createAlgorithm));
});

export const showDeleteAlgorithmModal = createAsyncThunk(
  "showDeleteAlgorithmModal",
  async ({ algorithm }, thunkAPI) => {
    thunkAPI.dispatch(showModal(modalTypes.deleteAlgorithm, { algorithm }));
  }
);

export const showUploadAlgorithmDataModal = createAsyncThunk(
  "showUploadAlgorithmDataModal",
  async ({ algorithmId, algorithmDataType }, thunkAPI) => {
    thunkAPI.dispatch(showModal(modalTypes.uploadAlgorithmData, { algorithmId, algorithmDataType }));
  }
);

export const showClearAlgorithmDataModal = createAsyncThunk(
  "showUploadAlgorithmConstructorModal",
  async ({ algorithmId, algorithmDataType }, thunkAPI) => {
    thunkAPI.dispatch(showModal(modalTypes.clearAlgorithmData, { algorithmId, algorithmDataType }));
  }
);

export const showUploadAlgorithmImageModal = createAsyncThunk(
  "showUploadAlgorithmImageModal",
  async ({ algorithmId }, thunkAPI) => {
    thunkAPI.dispatch(showModal(modalTypes.uploadAlgorithmImage, { algorithmId }));
  }
);

const processAlgorithmDataUpload = async (response, thunkAPI) => {
  if (statusCode.ok(response)) {
    thunkAPI.dispatch(hideModal());
    return { hasError: false };
  }

  if (statusCode.badRequest(response)) {
    const { validationErrors: errors } = await response.json();
    const validationErrors = {};
    errors.forEach((error) => (validationErrors[error.field] = error.message));

    return { validationErrors, hasError: true };
  }

  return { hasError: true };
};

const processAlgorithmDataClear = async (response, thunkAPI) => {
  if (statusCode.noContent(response)) {
    thunkAPI.dispatch(hideModal());
    return { hasError: false };
  }

  return { hasError: true };
};
