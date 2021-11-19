import api from "../api";
import baseService from "./base-service";

const userTestResultService = {
  fetchTestResults: async (searchText, groupId, pageIndex, pageSize, sortBy, sortDirection) => {
    const params = {
      searchText,
      groupId,
      pageIndex,
      pageSize,
      sortBy,
      desc: sortDirection === "desc",
    };

    const url = api.userTestResult.fetchTestResults(params);
    return await baseService.get(url);
  },

  fetchTestResult: async (testId, userId) => {
    const url = api.userTestResult.fetchTestResult(testId, userId);
    return await baseService.get(url);
  },

  deleteTestResult: async (testId, userId) => {
    const url = api.userTestResult.deleteTestResult(testId, userId);
    return await baseService.delete(url);
  },
};

export default userTestResultService;