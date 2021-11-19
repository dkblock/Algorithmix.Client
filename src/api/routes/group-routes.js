import { getRoute } from "../../utils/get-route";

const groupRoutes = {
  fetchGroups: (params) => getRoute("groups", params),
  createGroup: () => getRoute("groups"),
  deleteGroup: (groupId) => getRoute(`groups/${groupId}`),
  updateGroup: (groupId) => getRoute(`groups/${groupId}`),
};

export default groupRoutes;
