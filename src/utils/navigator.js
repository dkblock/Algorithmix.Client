import routes from "./routes";
import history from '../store/utils/history';

export const navigateToHome = () => history.push(routes.home);
export const navigateToLogin = () => history.push(routes.account.login);
export const navigateToRegister = () => history.push(routes.account.register);

export const navigateToAlgorithms = () => history.push(routes.algorithms);
export const navigateToAlgorithm = (algorithmId) => history.push(`${routes.algorithms}/${algorithmId}`);

export const navigateToConstructor = () => history.push(routes.constructor.main);
export const navigateToConstructorAlgorithm = (algorithmId) => history.push(routes.constructor.algorithm(algorithmId));

export const navigateToTests = () => history.push(routes.tests.main);
export const navigateToTestDesigner = (testId) => history.push(routes.tests.design(testId));
export const navigateToTestPass = (testId) => history.push(routes.tests.pass(testId));
export const navigateToTestStats = (testId) => history.push(routes.tests.stats(testId));
export const navigateToTestResult = (testId) => history.push(routes.tests.result(testId));
export const navigateToUserTestResult = (testId, userId) => history.push(routes.tests.userResult(testId, userId));

export const navigateToTestsManagement = () => history.push(routes.management.tests);
export const navigateToTestResultsManagement = () => history.push(routes.management.testResults);
export const navigateToUsersManagement = () => history.push(routes.management.users);
export const navigateToGroupsManagement = () => history.push(routes.management.groups);
