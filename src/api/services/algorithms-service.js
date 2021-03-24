import api from "../api";
import baseService from "./base-service";

const algorithmsService = {
    fetchAlgorithms: async () => {
        const url = api.algorithms.fetchAlgorithmsUrl();
        return await baseService.get(url);
    }
};

export default algorithmsService;