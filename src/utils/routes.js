const routes = {
  home: "/home",
  account: "/account",
  algorithms: "/algorithms",
  constructor: "/constructor",

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

  login: "/login",
  register: "/register",
};

export default routes;
