import React from "react";
import Paper from "@material-ui/core/Paper";
import HomeCarousel from "./HomeCarousel";
import HomeInfo from "./HomeInfo";

const Home = () => {
    return (
        <div className="home">
            <Paper className="home-container">
                <HomeCarousel/>
                <HomeInfo/>
            </Paper>
        </div>
    );
}

export default Home;