import React from "react";
import { Route } from "react-router";
import PrivateRoute from "../_common/route/private-route";
import routes from "../../utils/routes";
import AccountSettings from "./account-settings";
import Login from "./login";
import Register from "./register";
import ConfirmEmail from "./confirm-email";
import ForgotPassword from "./forgot-password";
import ResetPassword from "./reset-password";
import "./account.scss";

const Account = () => {
  return (
    <div className="account">
      <PrivateRoute path={routes.account.settings} render={(props) => <AccountSettings {...props} />} />
      <Route path={routes.account.login} render={(props) => <Login {...props} />} />
      <Route path={routes.account.register} render={(props) => <Register {...props} />} />
      <Route path={routes.account.confirmEmail} render={(props) => <ConfirmEmail {...props} />} />
      <Route path={routes.account.forgotPassword} render={(props) => <ForgotPassword {...props} />} />
      <Route path={routes.account.resetPassword} render={(props) => <ResetPassword {...props} />} />
    </div>
  );
};

export default Account;
