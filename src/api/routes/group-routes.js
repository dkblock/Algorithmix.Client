import { getRoute } from "../../utils/get-route";

const groupRoutes = {
  fetchRoutes: () => getRoute("groups"),
  createGroup: () => getRoute("groups"),
  deleteGroup: (groupId) => getRoute(`groups/${groupId}`),
  updateGroup: (groupId) => getRoute(`groups/${groupId}`),
};

export default groupRoutes;
