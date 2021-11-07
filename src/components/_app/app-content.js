import React from "react";
import { Route, Switch } from "react-router-dom";
import ExecutiveRoute from "../_common/route/executive-route";
import Home from "../home";
import Account from "../account";
import Algorithms from "../algorithms";
import Constructor from "../constructor";
import Tests from "../tests";
import Management from "../management";
import ModalRoot from "../_common/modal/modal-root";
import routes from "../../utils/routes";

const AppContent = () => (
  <div className="app__content">
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path={routes.home} component={Home} />
      <Route path={routes.account.main} component={Account}/>
      <Route path={routes.algorithms.main} component={Algorithms} />
      <Route path={routes.constructor.main} component={Constructor} />
      <Route path={routes.tests.main} component={Tests} />
      <ExecutiveRoute path={routes.management.main} render={(props) => <Management {...props} />} />
    </Switch>
    <ModalRoot />
  </div>
);

export default AppContent;
