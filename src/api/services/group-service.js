import api from "../api";
import baseService from "./base-service";

const groupService = {
  fetchGroups: async (searchText, pageIndex, pageSize, sortBy, sortDirection) => {
    const params = {
      searchText,
      pageIndex,
      pageSize,
      sortBy,
      desc: sortDirection === "desc",
    };

    const url = api.groups.fetchGroups(params);
    return await baseService.get(url);
  },

  createGroup: async (group) => {
    const url = api.groups.createGroup();
    return await baseService.post(url, group);
  },

  deleteGroup: async (groupId) => {
    const url = api.groups.deleteGroup(groupId);
    return await baseService.delete(url);
  },

  updateGroup: async (groupId, group) => {
    const url = api.groups.updateGroup(groupId);
    return await baseService.put(url, group);
  },
};

export default groupService;
