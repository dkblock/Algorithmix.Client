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
    result: (testId) => `/tests/${testId}/result`,
  },

  management: {
    main: "/management",
    tests: "/management/tests",
    testResults: "/management/testResults",
    users: "/management/users",
    groups: "/management/groups",
  },
};

export default routes;
