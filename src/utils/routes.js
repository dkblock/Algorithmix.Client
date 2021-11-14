const routes = {
  home: "/home",

  algorithms: {
    main: "/algorithms",
    description: (algorithmId) => `/algorithms/${algorithmId}`,
    design: (algorithmId) => `/algorithms/${algorithmId}/design`,
  },

  constructor: {
    main: "/constructor",
    algorithm: (algorithmId) => `/constructor/${algorithmId}`,
  },

  account: {
    main: "/account",
    login: "/account/login",
    register: "/account/register",
    confirmEmail: "/account/confirm-email",
    forgotPassword: "/account/forgot-password",
    resetPassword: "/account/reset-password",
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
