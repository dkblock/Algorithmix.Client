import { getRoute } from "../../utils/get-route";

const loginUrl = getRoute("account/login");
const logoutUrl = getRoute("account/logout");
const registerUrl = getRoute("account/register");

export default {
    loginUrl,
    logoutUrl,
    registerUrl
};