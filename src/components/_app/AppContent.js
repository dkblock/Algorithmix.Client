import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../_common/Route/PrivateRoute";
import Home from "../home";
import Login from "../account/Login";
import Register from "../account/Register";
import Algorithms from "../algorithms";
import Constructor from "../constructor";
import Tests from "../tests";
import ModalRoot from "../_common/Modal/ModalRoot";
import routes from "../../utils/routes";

const AppContent = () => (
    <div className="app__content">
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path={routes.home} component={Home}/>
            <Route path={routes.login} component={Login}/>
            <Route path={routes.register} component={Register}/>
            <Route path={routes.algorithms} component={Algorithms}/>
            <Route path={routes.constructor} component={Constructor}/>
            <Route path={routes.tests} component={Tests}/>
        </Switch>
        <ModalRoot/>
    </div>
);

export default AppContent;