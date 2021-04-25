const routes = {
  home: "/home",
  account: "/account",
  algorithms: "/algorithms",
  constructor: "/constructor",

  tests: "/tests",
  testDesign: (testId) => `/tests/${testId}/design`,
  testPass: (testId) => `/tests/${testId}`,
  testResult: (testId) => `/tests/${testId}/result`,

  login: "/login",
  register: "/register",
};

export default routes;
