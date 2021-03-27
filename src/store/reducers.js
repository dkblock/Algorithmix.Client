import { connectRouter } from "connected-react-router";
import appReducer from "./reducers/app";
import accountReducer from "./reducers/account";
import algorithmReducer from "./reducers/algorithm";
import modalReducer from "./reducers/modal";
import testReducer from "./reducers/test";

const createRootReducer = (history) => ({
    router: connectRouter(history),
    app: appReducer,
    account: accountReducer,
    algorithm: algorithmReducer,
    modal: modalReducer,
    test: testReducer
});

export default createRootReducer;