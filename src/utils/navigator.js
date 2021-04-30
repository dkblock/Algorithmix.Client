import routes from "./routes";
import { history } from "../components/_app/AppContainer";

export const navigateToHome = () => history.push(routes.home);
export const navigateToLogin = () => history.push(routes.login);
export const navigateToRegister = () => history.push(routes.register);

export const navigateToAlgorithms = () => history.push(routes.algorithms);
export const navigateToAlgorithm = (algorithmId) => history.push(`${routes.algorithms}/${algorithmId}`);

export const navigateToConstructor = () => history.push(routes.constructor);

export const navigateToTests = () => history.push(routes.tests.main);
export const navigateToTestDesigner = (testId) => history.push(routes.tests.design(testId));
export const navigateToTestPass = (testId) => history.push(routes.tests.pass(testId));
export const navigateToTestResult = (testId) => history.push(routes.tests.result(testId));

export const navigateToTestsManagement = () => history.push(routes.management.tests);
export const navigateToTestResultsManagement = () => history.push(routes.management.testResults);
export const navigateToUsersManagement = () => history.push(routes.management.users);
export const navigateToGroupsManagement = () => history.push(routes.management.groups);
