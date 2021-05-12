import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTest } from "./test";

export const fetchTestStats = createAsyncThunk("fetchTestStats", async ({ testId }, thunkAPI) => {
  const {
    payload: { test, questions, hasError },
  } = await thunkAPI.dispatch(fetchTest({ testId }));

  return { test, questions, hasError };
});
