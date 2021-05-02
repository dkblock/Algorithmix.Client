import { createAsyncThunk } from "@reduxjs/toolkit";
import groupService from "../../api/services/group-service";
import statusCode from "../../utils/status-code-reader";

export const fetchGroups = createAsyncThunk("fetchGroups", async () => {
  const response = await groupService.fetchGroups();

  if (statusCode.ok(response)) {
    const groups = await response.json();
    return { groups, hasError: false };
  }

  return { hasError: true };
});