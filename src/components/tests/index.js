import React, { useEffect } from "react";
import { Route } from "react-router";
import { useDispatch } from "react-redux";
import { fetchTests } from "../../store/actions/test";
import routes from "../../utils/routes";
import ExecutiveRoute from "../_common/Route/ExecutiveRoute";
import PrivateRoute from "../_common/Route/PrivateRoute";
import TestDesigner from "./design/TestDesigner";
import TestPass from "./pass/TestPass";
import TestResult from "./pass/TestResult";
import TestView from "./view/TestView";

const Tests = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTests());
  }, [dispatch]);

  return (
    <>
      <ExecutiveRoute path={`${routes.tests}/:testId/design`} render={(props) => <TestDesigner {...props} />} />
      <PrivateRoute path={`${routes.tests}/:testId`} exact render={(props) => <TestPass {...props} />} />
      <PrivateRoute path={`${routes.tests}/:testId/result`} render={(props) => <TestResult {...props} />} />
      <Route path={routes.tests} exact render={(props) => <TestView {...props} />} />
    </>
  );
};

export default Tests;
