import React from "react";
import { Route, Switch } from "react-router-dom";
import routes from "../../utils/routes";
import Home from "../home";
import Algorithms from "../algorithms";
import Constructor from "../constructor";
import Tests from "../tests";

const Main = () => (
    <Switch>
        <Route path="/" exact component={Home}/>
        <Route path={routes.home} component={Home}/>
        <Route path={routes.algorithms} component={Algorithms}/>
        <Route path={routes.constructor} component={Constructor}/>
        <Route path={routes.tests} component={Tests}/>
    </Switch>
);

export default Main;