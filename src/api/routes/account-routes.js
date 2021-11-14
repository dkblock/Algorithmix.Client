import { getRoute } from "../../utils/get-route";

const accountRoutes = {
  auth: () => getRoute("account/auth"),
  login: () => getRoute("account/login"),
  register: () => getRoute("account/register"),

  updateUserInformation: () => getRoute("account"),
  confirmEmail: () => getRoute("account/confirm-email"),
  changePassword: () => getRoute("account/change-password"),
  resetPassword: () => getRoute("account/reset-password"),
};

export default accountRoutes;