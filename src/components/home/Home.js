import React from "react";
import Paper from "@material-ui/core/Paper";
import HomeInfo from "./HomeInfo";

const Home = () => {
    return (
        <div className="home">
            <Paper className="home-container">
                <HomeInfo/>
            </Paper>
        </div>
    );
}

export default Home;