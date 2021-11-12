import { getRoute } from "../../utils/get-route";

const accountRoutes = {
  auth: () => getRoute("account/auth"),
  login: () => getRoute("account/login"),
  register: () => getRoute("account/register"),

  resetPassword: () => getRoute("account/reset-password"),
};

export default accountRoutes;