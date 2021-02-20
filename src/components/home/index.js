import React, { useEffect } from "react";
import HomeContainer from "./components/HomeContainer";

const Home = () => {
    useEffect(() => {
        document.title = "Главная";
    }, []);

    return <HomeContainer/>;
};

export default Home;