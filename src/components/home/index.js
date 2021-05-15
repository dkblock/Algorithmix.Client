import React from "react";
import { useTitle } from "../../hooks";
import HomeInfo from "./HomeInfo";
import "./Home.scss";

const Home = () => {
  useTitle("Главная", "Algorithmix");

  return (
    <div className="home-container">
      <HomeInfo />
    </div>
  );
};

export default Home;
