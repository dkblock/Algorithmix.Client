import api from "../api";
import baseService from "./base-service";

const testService = {
  fetchPublishedTests: async (searchText) => {
    const url = api.tests.fetchPublishedTests(searchText);
    return await baseService.get(url);
  },

  fetchTests: async () => {
    const url = api.tests.fetchTests();
    return await baseService.get(url);
  },

  fetchTest: async (testId) => {
    const url = api.tests.fetchTest(testId);
    return await baseService.get(url);
  },

  createTest: async (createdTest) => {
    const url = api.tests.createTest();
    return await baseService.post(url, createdTest);
  },

  deleteTest: async (testId) => {
    const url = api.tests.deleteTest(testId);
    return await baseService.delete(url);
  },

  updateTest: async (testId, updatedTest) => {
    const url = api.tests.updateTest(testId);
    return await baseService.put(url, updatedTest);
  },

  publishTest: async (testId) => {
    const url = api.tests.publishTest(testId);
    return await baseService.get(url);
  },

  startTestPass: async (testId) => {
    const url = api.tests.startTestPass(testId);
    return await baseService.get(url);
  },

  fetchTestResult: async (testId) => {
    const url = api.tests.fetchTestResult(testId);
    return await baseService.get(url);
  },
};

export default testService;
