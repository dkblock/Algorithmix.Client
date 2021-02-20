import React from "react";
import HomeCarousel from "./HomeCarousel";
import PageTitle from "../../_common/PageTitle/PageTitle";
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