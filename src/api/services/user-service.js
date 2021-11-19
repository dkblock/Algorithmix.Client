import api from "../api";
import baseService from "./base-service";

const userService = {
  fetchUsers: async (searchText, groupId, role, pageIndex, pageSize, sortBy, sortDirection) => {
    const params = {
      searchText,
      groupId,
      role,
      pageIndex,
      pageSize,
      sortBy,
      desc: sortDirection === "desc",
    };

    const url = await api.users.fetchUsers(params);
    return await baseService.get(url);
  },

  deleteUser: async (userId) => {
    const url = await api.users.deleteUser(userId);
    return await baseService.delete(url);
  },

  updateUser: async (userId, updatedUser) => {
    const url = await api.users.updateUser(userId);
    return await baseService.put(url, updatedUser);
  },
};

export default userService;
