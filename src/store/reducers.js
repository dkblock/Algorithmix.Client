import { connectRouter } from "connected-react-router";
import appReducer from "./reducers/app";
import accountReducer from "./reducers/account";
import accountSettingsReducer from "./reducers/account-settings";
import algorithmReducer from "./reducers/algorithm";
import algorithmDesignReducer from "./reducers/algorithm-design";
import groupReducer from "./reducers/group";
import modalReducer from "./reducers/modal";
import publishedTestReducer from "./reducers/published-test";
import testReducer from "./reducers/test";
import testDesignReducer from "./reducers/test-design";
import testPassReducer from "./reducers/test-pass";
import testStatsReducer from "./reducers/test-stats";
import userReducer from "./reducers/user";
import userTestResultReducer from "./reducers/user-test-result";

const createRootReducer = (history) => ({
  router: connectRouter(history),
  app: appReducer,
  account: accountReducer,
  accountSettings: accountSettingsReducer,
  algorithm: algorithmReducer,
  algorithmDesign: algorithmDesignReducer,
  group: groupReducer,
  modal: modalReducer,
  publishedTest: publishedTestReducer,
  test: testReducer,
  testDesign: testDesignReducer,
  testPass: testPassReducer,
  testStats: testStatsReducer,
  user: userReducer,
  userTestResult: userTestResultReducer,
});

export default createRootReducer;
