import urlJoin from "url-join";
import config from "../config";

export const getFileSrc = (src) => urlJoin(config.baseUrl, src);
