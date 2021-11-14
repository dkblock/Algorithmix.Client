import routes from "./routes";
import history from "../store/utils/history";

export const navigateToHome = () => history.push(routes.home);

export const navigateToLogin = () => history.push(routes.account.login);
export const navigateToRegister = () => history.push(routes.account.register);
export const navigateToForgotPassword = () => history.push(routes.account.forgotPassword);
export const navigateToAccountSettings = () => history.push(routes.account.settings);

export const navigateToAlgorithms = () => history.push(routes.algorithms.main);
export const navigateToAlgorithmDescription = (algorithmId) => history.push(routes.algorithms.description(algorithmId));
export const navigateToAlgorithmDesign = (algorithmId) => history.push(routes.algorithms.design(algorithmId));

export const navigateToConstructor = () => history.push(routes.constructor.main);
export const navigateToAlgorithmConstructor = (algorithmId) => history.push(routes.constructor.algorithm(algorithmId));

export const navigateToTests = () => history.push(routes.tests.main);
export const navigateToTestDesign = (testId) => history.push(routes.tests.design(testId));
export const navigateToTestPass = (testId) => history.push(routes.tests.pass(testId));
export const navigateToTestStats = (testId) => history.push(routes.tests.stats(testId));
export const navigateToTestResult = (testId) => history.push(routes.tests.result(testId));
export const navigateToUserTestResult = (testId, userId) => history.push(routes.tests.userResult(testId, userId));

export const navigateToAlgorithmsManagement = () => history.push(routes.management.algorithms);
export const navigateToTestsManagement = () => history.push(routes.management.tests);
export const navigateToTestResultsManagement = () => history.push(routes.management.testResults);
export const navigateToUsersManagement = () => history.push(routes.management.users);
export const navigateToGroupsManagement = () => history.push(routes.management.groups);
