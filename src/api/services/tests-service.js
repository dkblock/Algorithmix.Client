import api from "../api";
import baseService from "./base-service";

const testsService = () => {
    const fetchTests = async () => {
        const url = api.tests.fetchTests;
        return await baseService.get(url);
    };

    return {
        fetchTests
    };
};

export default testsService();