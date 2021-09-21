import React from "react";
import Paper from "@mui/material/Paper";
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