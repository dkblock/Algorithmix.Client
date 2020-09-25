import React from "react";
import { Link } from "react-router-dom";
import routes from "../../utils/routes";

const Header = () => (
    <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom box-shadow mb-3">
            <div className="container">
                <Link className="navbar-brand" to={routes.home}>
                    Visual Algorithms
                </Link>
                <Link className="nav-item" to={routes.home}>
                    Главная
                </Link>
                <Link className="nav-item" to={routes.algorithms}>
                    Алгоритмы
                </Link>
                <Link className="nav-item" to={routes.constructor}>
                    Конструктор
                </Link>
                <Link className="nav-item" to={routes.tests}>
                    Тесты
                </Link>
            </div>
        </nav>
    </header>
);

export default Header;