import { createAsyncThunk } from "@reduxjs/toolkit";
import { showModal, hideModal } from "./modal";
import testsService from "../../api/services/tests-service";
import statusCode from "../../utils/status-code-reader";
import modalTypes from "../../constants/modal-types";

export const fetchTests = createAsyncThunk("fetchTests", async () => {
    const response = await testsService.fetchTests();

    if (statusCode.ok(response)) {
        const tests = await response.json();
        return { tests, hasError: false };
    }

    return { tests: [], hasError: true };
});

export const createTest = createAsyncThunk("createTest", async (test, thunkAPI) => {
    thunkAPI.dispatch(hideModal());
    const response = await testsService.createTest(test);

    if (statusCode.created(response)) {
        const createdTest = await response.json();
        return { test: createdTest, hasError: false };
    }

    return { test: null, hasError: true };
});

export const showCreateTestModal = createAsyncThunk("showCreateTestModal", async (params, thunkAPI) => {
   thunkAPI.dispatch(showModal(modalTypes.createTest));
});