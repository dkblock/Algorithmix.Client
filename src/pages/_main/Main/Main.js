import React from "react";
import cn from "classnames";
import { Route, Switch } from "react-router-dom";
import bem from "../../../utils/bem";
import routes from "../../../utils/routes";
import Home from "../../home";
import Algorithms from "../../algorithms";
import Constructor from "../../constructor";
import Tests from "../../tests";
import styles from "./Main.module.scss";

const block = bem(styles);

const Main = () => (
    <div className={cn(block(), "col-10")}>
        <Switch>
            <Route path="/" exact component={Home}/>
            <Route path={routes.home} component={Home}/>
            <Route path={routes.algorithms} component={Algorithms}/>
            <Route path={routes.constructor} component={Constructor}/>
            <Route path={routes.tests} component={Tests}/>
        </Switch>
    </div>
);

export default Main;