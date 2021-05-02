import React from "react";
import Home from "./Home";
import { useTitle } from "../../hooks";
import "./Home.scss";

const HomePage = () => {
    useTitle("Главная", "Algorithmix");
    return <Home/>;
};

export default HomePage;