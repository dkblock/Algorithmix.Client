import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../home";
import Account from "../account";
import Algorithms from "../algorithms/Algorithms";
import Constructor from "../constructor";
import Tests from "../tests";
import routes from "../../utils/routes";

const AppContent = () => (
    <div className="app__content">
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path={routes.home} component={Home}/>
            <Route path={routes.account} component={Account}/>
            <Route path={routes.algorithms} component={Algorithms}/>
            <Route path={routes.constructor} component={Constructor}/>
            <Route path={routes.tests} component={Tests}/>
        </Switch>
    </div>
);

export default AppContent;