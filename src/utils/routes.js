const routes = {
  home: "/home",
  algorithms: "/algorithms",
  constructor: "/constructor",

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
    tests: "/management/tests",
    testResults: "/management/user-test-results",
    users: "/management/users",
    groups: "/management/groups",
  },
};

export default routes;
