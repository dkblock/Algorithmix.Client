import React from "react";
import Paper from "@material-ui/core/Paper";
import HomeInfo from "./home-info";

const Home = () => {
  return (
    <div className="home-container">
      <Paper className="home-container">
        <HomeInfo />
      </Paper>
    </div>
  );
};

export default Home;