import { createAsyncThunk } from "@reduxjs/toolkit";
import userTestResultService from "../../api/services/user-test-result-service";
import statusCode from "../../utils/status-code-reader";
import { hideModal, showModal } from "./modal";
import modalTypes from "../../constants/modal-types";

export const fetchTestResults = createAsyncThunk("fetchTestResults", async () => {
  const response = await userTestResultService.fetchTestResults();

  if (statusCode.ok(response)) {
    const testResults = await response.json();
    return { testResults, hasError: false };
  }

  return { testResults: [], hasError: true };
});

export const deleteTestResult = createAsyncThunk("deleteTestResult", async ({ testId, userId }, thunkAPI) => {
  const response = await userTestResultService.deleteTestResult(testId, userId);

  if (statusCode.noContent(response)) {
    thunkAPI.dispatch(hideModal());
    return { testId, userId, hasError: false };
  }

  return { testId: null, userId: null, hasError: true };
});

export const showDeleteTestResultModal = createAsyncThunk(
  "showDeleteTestResultModal",
  async ({ testResult }, thunkAPI) => {
    thunkAPI.dispatch(showModal(modalTypes.deleteTestResult, { testResult }));
  }
);
