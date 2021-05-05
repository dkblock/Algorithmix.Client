import { connectRouter } from "connected-react-router";
import appReducer from "./reducers/app";
import accountReducer from "./reducers/account";
import algorithmReducer from "./reducers/algorithm";
import groupReducer from "./reducers/group";
import modalReducer from "./reducers/modal";
import testReducer from "./reducers/test";
import testAnswerReducer from "./reducers/test-answer";
import testQuestionReducer from "./reducers/test-question";
import testPassReducer from "./reducers/test-pass";
import userReducer from "./reducers/user";
import userTestResultReducer from "./reducers/user-test-result";

const createRootReducer = (history) => ({
  router: connectRouter(history),
  app: appReducer,
  account: accountReducer,
  algorithm: algorithmReducer,
  group: groupReducer,
  modal: modalReducer,
  test: testReducer,
  testAnswer: testAnswerReducer,
  testQuestion: testQuestionReducer,
  testPass: testPassReducer,
  user: userReducer,
  userTestResult: userTestResultReducer,
});

export default createRootReducer;
