import React from "react";
import { Route } from "react-router-dom";
import Redirect, { routes } from "./redirect";
import { useCurrentUser } from "../../../hooks";

const PrivateRoute = ({ render, path, exact }) => {
  const { isAuthenticated, isFetching } = useCurrentUser();

  if (isFetching) return null;

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => (isAuthenticated ? render(props) : <Redirect to={routes.account.login} />)}
    />
  );
};

export default PrivateRoute;