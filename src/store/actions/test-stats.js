import { createAsyncThunk } from "@reduxjs/toolkit";
import testService from "../../api/services/test-service";
import statusCode from "../../utils/status-code-reader";

export const fetchTestStats = createAsyncThunk("fetchTestStats", async ({ testId }, thunkAPI) => {
  const response = await testService.fetchTestStats(testId);

  if (statusCode.ok(response)) {
    const { test, questionStats } = await response.json();
    return { test, questionStats, hasError: false };
  }

  return { hasError: true };
});
