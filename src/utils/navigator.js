import routes from "./routes";
import { history } from "../components/_app/AppContainer";

export const navigateToHome = () => history.push(routes.home);