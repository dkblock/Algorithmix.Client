import React from "react";
import HomeCarousel from "./HomeCarousel";
import PageTitle from "../../../components/PageTitle/PageTitle";
import HomeInfo from "./HomeInfo";

const HomeContainer = () => {
    return (
        <>
            <PageTitle>Visual Algorithms</PageTitle>
            <HomeCarousel/>
            <HomeInfo/>
        </>
    );
}

export default HomeContainer;