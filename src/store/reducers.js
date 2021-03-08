import appReducer from "./reducers/app";
import accountReducer from "./reducers/account";
import algorithmsReducer from "./reducers/algorithms";

const rootReducer = {
    app: appReducer,
    account: accountReducer,
    algorithms: algorithmsReducer
};

export default rootReducer;