import React from "react";
import Paper from "@material-ui/core/Paper";
import Carousel from "react-material-ui-carousel";
import { getImageSrc } from "../../utils/get-image-src";
import { navigateToAlgorithms, navigateToConstructor, navigateToTests } from "../../utils/navigator";

const carouselItems = [
  {
    title: "Алгоритмы",
    description: "Изучите различные алгоритмы и структуры данных",
    imageSrc: "algorithms",
    navigateTo: navigateToAlgorithms,
  },
  {
    title: "Конструктор",
    description: "Конструктор позволит Вам увидеть работу каждого алгоритма",
    imageSrc: "constructor",
    navigateTo: navigateToConstructor,
  },
  {
    title: "Тесты",
    description: "Закрепите свои знания, пройдя тесты",
    imageSrc: "tests",
    navigateTo: navigateToTests,
  },
  {
    title: "Ведётся разработка",
    description: "Сайт находится в стадии разработки. Информация будет дополняться",
    imageSrc: "work-in-progress",
    navigateTo: null,
  },
];

const HomeCarousel = () => {
  return (
    <Carousel
      className="home-carousel"
      timeout={600}
      interval={5000}
      changeOnFirstRender={true}
      indicatorIconButtonProps={{ style: { outline: "none" } }}
      navButtonsProps={{ style: { outline: "none" } }}
    >
      {carouselItems.map((item, index) => (
        <CarouselItem key={index} item={item} />
      ))}
    </Carousel>
  );
};

const CarouselItem = ({ item: { imageSrc, title, description, navigateTo } }) => {
  return (
    <Paper className="home-carousel__item" onClick={navigateTo}>
      <img className="home-carousel__img" src={getImageSrc(`images/home-carousel/${imageSrc}.png`)} alt={title} />
      <div className="home-carousel__caption">
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
    </Paper>
  );
};

export default HomeCarousel;
