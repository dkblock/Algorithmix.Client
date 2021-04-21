import routes from "./routes";
import { history } from "../components/_app/AppContainer";

export const navigateToHome = () => history.push(routes.home);

export const navigateToAlgorithms = () => history.push(routes.algorithms);
export const navigateToAlgorithm = (algorithmId) => history.push(`${routes.algorithms}/${algorithmId}`);

export const navigateToConstructor = () => history.push(routes.constructor);

export const navigateToTests = () => history.push(routes.tests);
export const navigateToTestDesigner = (testId) => history.push(`${routes.tests}/${testId}/design`);
export const navigateToTestPass = (testId) => history.push(`${routes.tests}/${testId}`);

export const navigateToLogin = () => history.push(routes.login);
export const navigateToRegister = () => history.push(routes.register);