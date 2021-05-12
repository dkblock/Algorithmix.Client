import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router";
import { fetchTests } from "../../store/actions/test";
import routes from "../../utils/routes";
import ExecutiveRoute from "../_common/Route/ExecutiveRoute";
import PrivateRoute from "../_common/Route/PrivateRoute";
import TestDesigner from "./design/TestDesigner";
import TestList from "./list/TestList";
import TestPass from "./pass/TestPass";
import TestStats from "./stats/TestStats";
import OwnTestResult from "./result/OwnTestResult";
import UserTestResult from "./result/UserTestResult";

const Tests = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTests());
  }, [dispatch]);

  return (
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
};

export default Tests;
