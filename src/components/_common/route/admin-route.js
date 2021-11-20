import React from "react";
import { Route } from "react-router-dom";
import Redirect, { routes } from "./redirect";
import { useAdminRole, useCurrentUser } from "../../../hooks";

const AdminRoute = ({ render, path, exact }) => {
  const { isFetching } = useCurrentUser();
  const isAdmin = useAdminRole();

  if (isFetching) return null;

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => (isAdmin ? render(props) : <Redirect to={routes.account.login} />)}
    />
  );
};

export default AdminRoute;