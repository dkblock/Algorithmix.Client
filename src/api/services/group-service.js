import api from "../api";
import baseService from "./base-service";

const groupService = {
  fetchGroups: async () => {
    const url = api.groups.fetchRoutes();
    return await baseService.get(url);
  },
};

export default groupService;