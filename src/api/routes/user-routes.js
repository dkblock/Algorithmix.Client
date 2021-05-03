import { getRoute } from "../../utils/get-route";

const userRoutes = {
  fetchUsers: () => getRoute("users"),
  deleteUser: (userId) => getRoute(`users/${userId}`),
  updateUser: (userId) => getRoute(`users/${userId}`),
};

export default userRoutes;
