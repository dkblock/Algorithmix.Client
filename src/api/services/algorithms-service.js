import api from "../api";
import baseService from "./base-service";

const fetchAlgorithms = async () => {
    const url = api.algorithms.fetchAlgorithmsUrl();
    const response = await baseService.get(url);

    return await response.json();
};

export default {
    fetchAlgorithms
};