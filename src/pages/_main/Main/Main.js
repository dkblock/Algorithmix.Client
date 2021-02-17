import React from "react";
import cn from "classnames";
import { Route, Switch } from "react-router-dom";
import bem from "../../../utils/bem";
import routes from "../../../utils/routes";
import Home from "../../home";
import Account from "../../account";
import Algorithms from "../../algorithms";
import Constructor from "../../constructor";
import Tests from "../../tests";
import styles from "./Main.module.scss";

const block = bem(styles);

const Main = () => (
    <div className={block()}>
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

export default Main;