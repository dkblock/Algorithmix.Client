import urlJoin from "url-join";
import config from "../../config/config";

const fetchAlgorithmsUrl = () => urlJoin(config.baseUrl, "api/algorithms");

export default {
    fetchAlgorithmsUrl
};