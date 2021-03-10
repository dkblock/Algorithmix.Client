import React from "react";
import Home from "./Home";
import useTitle from "../../hooks/useTitle";
import "./Home.scss";

const HomePage = () => {
    useTitle("Главная");
    return <Home/>;
};

export default HomePage;