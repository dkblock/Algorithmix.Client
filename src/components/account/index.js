import React from "react";
import { Route } from "react-router";
import PrivateRoute from "../_common/Route/PrivateRoute";
import routes from "../../utils/routes";
import AccountSettings from "./AccountSettings";
import Login from "./Login";
import Register from "./Register";
import "./Account.scss";

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
