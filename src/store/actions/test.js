import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { showModal, hideModal } from "./modal";
import testService from "../../api/services/test-service";
import statusCode from "../../utils/status-code-reader";
import modalTypes from "../../constants/modal-types";

export const fetchTests = createAsyncThunk("fetchTests", async () => {
  const response = await testService.fetchTests();

  if (statusCode.ok(response)) {
    const tests = await response.json();
    return { tests, hasError: false };
  }

  return { tests: [], hasError: true };
});

export const fetchTest = createAsyncThunk("fetchTest", async ({ testId }) => {
  const response = await testService.fetchTest(testId);

  if (statusCode.ok(response)) {
    const test = await response.json();
    return { test, hasError: false };
  }

  return { test: null, hasError: true };
});

export const createTest = createAsyncThunk("createTest", async ({ test }, thunkAPI) => {
  thunkAPI.dispatch(hideModal());
  const response = await testService.createTest(test);

  if (statusCode.created(response)) {
    const createdTest = await response.json();
    return { test: createdTest, hasError: false };
  }

  return { hasError: true };
});

export const deleteTest = createAsyncThunk("deleteTest", async ({ testId }, thunkAPI) => {
  thunkAPI.dispatch(hideModal());
  const response = await testService.deleteTest(testId);

  if (statusCode.noContent(response)) {
    return { testId, hasError: false };
  }

  return { hasError: true };
});

export const publishTest = createAsyncThunk("publishTest", async ({ testId }) => {
  const response = await testService.publishTest(testId);
});

export const selectTest = createAction("selectTest", ({ testId }) => ({ payload: { testId } }));

export const editTest = createAction("editTest", ({ test }) => ({ payload: { test } }));

export const showCreateTestModal = createAsyncThunk("showCreateTestModal", async (params, thunkAPI) => {
  thunkAPI.dispatch(showModal(modalTypes.createTest));
});

export const showDeleteTestModal = createAsyncThunk("showDeleteTestModal", async ({ test }, thunkAPI) => {
  thunkAPI.dispatch(showModal(modalTypes.deleteTest, { test }));
});
