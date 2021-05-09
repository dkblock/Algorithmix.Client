import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router";
import { fetchTests } from "../../store/actions/test";
import routes from "../../utils/routes";
import ExecutiveRoute from "../_common/Route/ExecutiveRoute";
import PrivateRoute from "../_common/Route/PrivateRoute";
import TestDesigner from "../management/tests/design/TestDesigner";
import TestList from "./list/TestList";
import TestPass from "./pass/TestPass";
import OwnTestResult from "./result/OwnTestResult";
import UserTestResult from "./result/UserTestResult";

const Tests = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTests());
  }, [dispatch]);

  return (
    <>
      <PrivateRoute path={routes.tests.result(":testId")} exact render={(props) => <OwnTestResult {...props} />} />
      <ExecutiveRoute path={routes.tests.design(":testId")} render={(props) => <TestDesigner {...props} />} />
      <PrivateRoute path={routes.tests.pass(":testId")} exact render={(props) => <TestPass {...props} />} />
      <Route path={routes.tests.main} exact render={(props) => <TestList {...props} />} />
      <ExecutiveRoute
        path={routes.tests.userResult(":testId", ":userId")}
        render={(props) => <UserTestResult {...props} />}
      />
    </>
  );
};

export default Tests;
