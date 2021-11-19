import { getRoute } from "../../utils/get-route";

const userRoutes = {
  fetchUsers: (params) => getRoute("users", params),
  deleteUser: (userId) => getRoute(`users/${userId}`),
  updateUser: (userId) => getRoute(`users/${userId}`),
};

export default userRoutes;
