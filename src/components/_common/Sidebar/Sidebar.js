import React from "react";
import { Link } from "react-router-dom";
import routes from "../../../utils/routes";
import "./Sidebar.scss";
import { useSelector } from "react-redux";

const Sidebar = () => {
    const { currentUser: { role } } = useSelector(state => state.account);
    const isExecutive = role === "admin" || role === "moderator";

    return (
        <div>
            <div className="sidebar">
                <div className="sidebar__items">
                    <Link to={routes.home}>
                        <div className="sidebar__item"/>
                    </Link>
                    <Link to={routes.algorithms}>
                        <div className="sidebar__item"/>
                    </Link>
                    <Link to={routes.constructor}>
                        <div className="sidebar__item"/>
                    </Link>
                    <Link to={routes.tests}>
                        <div className="sidebar__item"/>
                    </Link>

                    {isExecutive && (
                        <Link to={routes.tests}>
                            <div className="sidebar__item"/>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;