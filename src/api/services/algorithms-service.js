import api from "../api";
import baseService from "./base-service";

const algorithmsService = () => {
    const fetchAlgorithms = async () => {
        const url = api.algorithms.fetchAlgorithmsUrl();
        const response = await baseService.get(url);

        return await response.json();
    };

    return {
        fetchAlgorithms
    };
};

export default algorithmsService();