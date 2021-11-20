import { createAsyncThunk } from "@reduxjs/toolkit";
import groupService from "../../api/services/group-service";
import statusCode from "../../utils/status-code-reader";
import { hideModal, showModal } from "./modal";
import modalTypes from "../../constants/modal-types";
import { groupFetchParams } from "../reducers/default-states";

export const fetchAllGroups = createAsyncThunk("fetchAllGroups", async (_, thunkAPI) => {
  await thunkAPI.dispatch(fetchGroups(groupFetchParams));
});

export const fetchGroups = createAsyncThunk(
  "fetchGroups",
  async ({ searchText, pageIndex, pageSize, sortBy, sortDirection }) => {
    const response = await groupService.fetchGroups(searchText, pageIndex, pageSize, sortBy, sortDirection);

    if (statusCode.ok(response)) {
      const { page: groups, totalCount } = await response.json();
      return { groups, totalCount, hasError: false };
    }

    return { groups: [], totalCount: 0, hasError: true };
  }
);

export const createGroup = createAsyncThunk("createGroup", async ({ group }, thunkAPI) => {
  const response = await groupService.createGroup(group);

  if (statusCode.created(response)) {
    thunkAPI.dispatch(hideModal());

    const createdGroup = await response.json();
    return { createdGroup, hasError: false };
  }

  if (statusCode.badRequest(response)) {
    const { validationErrors: errors } = await response.json();
    const validationErrors = {};
    errors.forEach((error) => (validationErrors[error.field] = error.message));

    return { validationErrors, hasError: true };
  }

  return { validationErrors: {}, hasError: true };
});

export const deleteGroup = createAsyncThunk("deleteGroup", async ({ groupId }, thunkAPI) => {
  const response = await groupService.deleteGroup(groupId);

  if (statusCode.noContent(response)) {
    thunkAPI.dispatch(hideModal());
    return { groupId, hasError: false };
  }

  return { groupId: null, hasError: true };
});

export const updateGroup = createAsyncThunk("updateGroup", async ({ groupId, group }) => {
  const response = await groupService.updateGroup(groupId, group);

  if (statusCode.ok(response)) {
    const updatedGroup = await response.json();
    return { updatedGroup, hasError: false };
  }

  return { hasError: true };
});

export const showCreateGroupModal = createAsyncThunk("showCreateGroupModal", async (params, thunkAPI) => {
  thunkAPI.dispatch(showModal(modalTypes.createGroup));
});

export const showDeleteGroupModal = createAsyncThunk("showDeleteGroupModal", async ({ group }, thunkAPI) => {
  thunkAPI.dispatch(showModal(modalTypes.deleteGroup, { group }));
});
