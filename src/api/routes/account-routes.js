import urlJoin from "url-join";
import config from "../../config";

const authUrl = () => urlJoin(config.baseUrl, "api/task/add");
const loginUrl = () => urlJoin(config.baseUrl, "api/account/login");
const logoutUrl = () => urlJoin(config.baseUrl, "api/account/logout");
const registerUrl = () => urlJoin(config.baseUrl, "api/account/register");

export default {
    authUrl,
    loginUrl,
    logoutUrl,
    registerUrl
};