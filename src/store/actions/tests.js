import { createAsyncThunk } from "@reduxjs/toolkit";
import testsService from "../../api/services/tests-service";
import statusCode from "../../utils/status-code-reader";

export const fetchTests = createAsyncThunk("fetchTests", async () => {
    const response = await testsService.fetchTests();

    if (statusCode.ok(response)) {
        const tests = await response.json();
        return { tests, hasError: false };
    }

    return { tests: [], hasError: true };
});