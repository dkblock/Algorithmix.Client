import React from "react";
import { useTitle } from "../../hooks";
import HomeInfo from "./home-info";
import "./home.scss";

const Home = () => {
  useTitle("Главная", "Algorithmix");

  return (
    <div className="home-container">
      <HomeInfo />
    </div>
  );
};

export default Home;
