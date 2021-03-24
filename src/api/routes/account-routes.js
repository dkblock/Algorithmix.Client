import { getRoute } from "../../utils/get-route";

const accountRoutes = {
    authUrl: () => getRoute("account/auth"),
    loginUrl: () => getRoute("account/login"),
    logoutUrl: () => getRoute("account/logout"),
    registerUrl: () => getRoute("account/register")
};

export default accountRoutes;