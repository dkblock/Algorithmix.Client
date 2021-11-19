import { createAsyncThunk } from "@reduxjs/toolkit";
import userTestResultService from "../../api/services/user-test-result-service";
import statusCode from "../../utils/status-code-reader";
import { hideModal, showModal } from "./modal";
import modalTypes from "../../constants/modal-types";

export const fetchUserTestResults = createAsyncThunk(
  "fetchUserTestResults",
  async ({ searchText, groupId, pageIndex, pageSize, sortBy, sortDirection }) => {
    const response = await userTestResultService.fetchTestResults(
      searchText,
      groupId,
      pageIndex,
      pageSize,
      sortBy,
      sortDirection
    );

    if (statusCode.ok(response)) {
      const { page: testResults, totalCount } = await response.json();
      return { testResults, totalCount, hasError: false };
    }

    return { testResults: [], totalCount: 0, hasError: true };
  }
);

export const fetchUserTestResult = createAsyncThunk("fetchUserTestResult", async ({ testId, userId }) => {
  const response = await userTestResultService.fetchTestResult(testId, userId);

  if (statusCode.ok(response)) {
    const testResult = await response.json();
    return { testResult, hasError: false };
  }

  return { testResult: null, hasError: true };
});

export const deleteUserTestResult = createAsyncThunk("deleteUserTestResult", async ({ testId, userId }, thunkAPI) => {
  const response = await userTestResultService.deleteTestResult(testId, userId);

  if (statusCode.noContent(response)) {
    thunkAPI.dispatch(hideModal());
    return { testId, userId, hasError: false };
  }

  return { testId: null, userId: null, hasError: true };
});

export const showDeleteUserTestResultModal = createAsyncThunk(
  "showDeleteUserTestResultModal",
  async ({ testResult }, thunkAPI) => {
    thunkAPI.dispatch(showModal(modalTypes.deleteUserTestResult, { testResult }));
  }
);
