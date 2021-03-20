import { getRoute } from "../../utils/get-route";

const authUrl = () => getRoute("account/auth");
const loginUrl = () => getRoute("account/login");
const logoutUrl = () => getRoute("account/logout");
const registerUrl = () => getRoute("account/register");

export default {
    authUrl,
    loginUrl,
    logoutUrl,
    registerUrl
};