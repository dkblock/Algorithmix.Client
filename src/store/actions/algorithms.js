import { createAsyncThunk } from "@reduxjs/toolkit";
import algorithmsService from "../../api/services/algorithms-service";
import statusCode from "../../utils/status-code-reader";

export const fetchAlgorithms = createAsyncThunk("fetchAlgorithms", async () => {
    const response = await algorithmsService.fetchAlgorithms();

    if (statusCode.ok(response)) {
        const algorithms = await response.json();
        return { algorithms, hasError: false };
    }

    return { algorithms: [], hasError: true };
});