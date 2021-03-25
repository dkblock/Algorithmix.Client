import { connectRouter } from "connected-react-router";
import appReducer from "./reducers/app";
import accountReducer from "./reducers/account";
import algorithmsReducer from "./reducers/algorithms";
import modalReducer from "./reducers/modal";
import testsReducer from "./reducers/tests";

const createRootReducer = (history) => ({
    router: connectRouter(history),
    app: appReducer,
    account: accountReducer,
    algorithms: algorithmsReducer,
    modal: modalReducer,
    tests: testsReducer
});

export default createRootReducer;