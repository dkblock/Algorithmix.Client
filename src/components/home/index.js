import React from "react";
import Home from "./Home";
import { useTitle } from "../../hooks";
import "./Home.scss";

const HomePage = () => {
    useTitle("Visual Algorithms");
    return <Home/>;
};

export default HomePage;