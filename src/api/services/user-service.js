import api from "../api";
import baseService from "./base-service";

const userService = {
  fetchUsers: async () => {
    const url = await api.users.fetchUsers();
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
