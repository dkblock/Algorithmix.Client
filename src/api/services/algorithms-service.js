import api from "../api";
import baseService from "./base-service";

const algorithmsService = () => {
    const fetchAlgorithms = async () => {
        const url = api.algorithms.fetchAlgorithmsUrl();
        return await baseService.getBase(url);
    };

    return {
        fetchAlgorithms
    };
};

export default algorithmsService();