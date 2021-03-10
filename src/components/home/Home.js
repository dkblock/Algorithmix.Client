import React from "react";
import HomeCarousel from "./HomeCarousel";
import HomeInfo from "./HomeInfo";

const Home = () => {
    return (
        <div className="home">
            <HomeCarousel/>
            <HomeInfo/>
        </div>
    );
}

export default Home;