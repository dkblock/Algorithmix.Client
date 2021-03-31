import { connectRouter } from "connected-react-router";
import appReducer from "./reducers/app";
import accountReducer from "./reducers/account";
import algorithmReducer from "./reducers/algorithm";
import modalReducer from "./reducers/modal";
import testReducer from "./reducers/test";
import testAnswerReducer from "./reducers/test-answer";
import testQuestionReducer from "./reducers/test-question";

const createRootReducer = (history) => ({
    router: connectRouter(history),
    app: appReducer,
    account: accountReducer,
    algorithm: algorithmReducer,
    modal: modalReducer,
    test: testReducer,
    testAnswer: testAnswerReducer,
    testQuestion: testQuestionReducer
});

export default createRootReducer;