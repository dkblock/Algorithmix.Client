import { connectRouter } from "connected-react-router";
import appReducer from "./reducers/app";
import accountReducer from "./reducers/account";
import algorithmsReducer from "./reducers/algorithms";

const createRootReducer = (history) => ({
    router: connectRouter(history),
    app: appReducer,
    account: accountReducer,
    algorithms: algorithmsReducer
});

export default createRootReducer;