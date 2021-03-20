import api from "../api";
import baseService from "./base-service";

const testsService = () => {
    const fetchTests = async () => {
        const url = api.tests.fetchTests();
        return await baseService.getBase(url);
    };

    const fetchTest = async (testId) => {
        const url = api.tests.fetchTest(testId);
        return await baseService.getBase(url);
    };

    const createTest = async (createdTest) => {
        const url = api.tests.createTest();
        return await baseService.postBase(url, createdTest);
    };

    const deleteTest = async (testId) => {
        const url = api.tests.deleteTest(testId);
        return await baseService.deleteBase(url);
    };

    const updateTest = async (testId, updatedTest) => {
        const url = api.tests.updateTest(testId);
        return await baseService.putBase(url, updatedTest);
    };

    return {
        fetchTests,
        fetchTest,
        createTest,
        deleteTest,
        updateTest
    };
};

export default testsService();