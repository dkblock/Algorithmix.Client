import React from "react";
import { Route } from "react-router";
import routes from "../../utils/routes";
import ExecutiveRoute from "../_common/route/executive-route";
import PrivateRoute from "../_common/route/private-route";
import TestDesigner from "./design/test-designer";
import TestList from "./list/test-list";
import TestPass from "./pass/test-pass";
import TestStats from "./stats/test-stats";
import OwnTestResult from "./result/own-test-result";
import UserTestResult from "./result/user-test-result";

const Tests = () => (
  <>
    <ExecutiveRoute path={routes.tests.design(":testId")} render={(props) => <TestDesigner {...props} />} />
    <Route path={routes.tests.main} exact render={(props) => <TestList {...props} />} />
    <PrivateRoute path={routes.tests.pass(":testId")} exact render={(props) => <TestPass {...props} />} />
    <ExecutiveRoute path={routes.tests.stats(":testId")} render={(props) => <TestStats {...props} />} />
    <PrivateRoute path={routes.tests.result(":testId")} exact render={(props) => <OwnTestResult {...props} />} />
    <ExecutiveRoute
      path={routes.tests.userResult(":testId", ":userId")}
      render={(props) => <UserTestResult {...props} />}
    />
  </>
);

export default Tests;
