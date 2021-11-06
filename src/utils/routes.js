const routes = {
  home: "/home",
  algorithms: "/algorithms",

  constructor: {
    main: "/constructor",
    algorithm: (algorithmId) => `/constructor/${algorithmId}`,
  },

  account: {
    main: "/account",
    login: "/account/login",
    register: "/account/register",
    settings: "/account/settings",
  },

  tests: {
    main: "/tests",
    design: (testId) => `/tests/${testId}/design`,
    pass: (testId) => `/tests/${testId}`,
    stats: (testId) => `/tests/${testId}/stats`,
    result: (testId) => `/tests/${testId}/result`,
    userResult: (testId, userId) => `/tests/${testId}/result/${userId}`,
  },

  management: {
    main: "/management",
    algorithms: "/management/algorithms",
    tests: "/management/tests",
    testResults: "/management/user-test-results",
    users: "/management/users",
    groups: "/management/groups",
  },
};

export default routes;
