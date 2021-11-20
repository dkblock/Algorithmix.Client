import React from "react";
import { Route } from "react-router-dom";
import Redirect, { routes } from "./redirect";
import { useCurrentUser, useExecutiveRole } from "../../../hooks";

const ExecutiveRoute = ({ render, path, exact }) => {
  const { isFetching } = useCurrentUser();
  const isExecutive = useExecutiveRole();

  if (isFetching) return null;

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => (isExecutive ? render(props) : <Redirect to={routes.account.login} />)}
    />
  );
};

export default ExecutiveRoute;