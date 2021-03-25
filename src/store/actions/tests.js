import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import testsService from "../../api/services/tests-service";
import statusCode from "../../utils/status-code-reader";
import { showModal } from "./modal";
import modalTypes from "../../constants/modal-types";

export const fetchTests = createAsyncThunk("fetchTests", async () => {
    const response = await testsService.fetchTests();

    if (statusCode.ok(response)) {
        const tests = await response.json();
        return { tests, hasError: false };
    }

    return { tests: [], hasError: true };
});

export const showCreateTestModal = createAction("showCreateTestModal", () => {})