import urlJoin from "url-join";
import qs from "qs";
import config from "../config";

export const getRoute = (route, params = null) => {
  if (!params) {
    return urlJoin(config.baseUrl, "api", route);
  }

  return urlJoin(config.baseUrl, "api", route, `?${qs.stringify(params)}`);
};
