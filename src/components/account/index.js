import React from "react";
import { Route } from "react-router";
import PrivateRoute from "../_common/route/private-route";
import routes from "../../utils/routes";
import AccountSettings from "./account-settings";
import Login from "./login";
import Register from "./register";
import "./account.scss";

const Account = () => {
  return (
    <div className="account">
      <PrivateRoute path={routes.account.settings} render={(props) => <AccountSettings {...props} />} />
      <Route path={routes.account.login} component={Login} />
      <Route path={routes.account.register} component={Register} />
    </div>
  );
};

export default Account;
