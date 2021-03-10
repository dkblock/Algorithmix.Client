import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { getImageSrc } from "../../utils/get-image-src";
import routes from "../../utils/routes";

const HomeCarousel = () => {
    return (
        <Carousel className="home-carousel unselectable-text" interval={4000} slide>
            <Carousel.Item className="home-carousel__link">
                <Link to={routes.algorithms}>
                    <img
                        className="home-carousel__img"
                        src={getImageSrc("images/home-carousel/algorithms.png")}
                        alt="Алгоритмы"
                    />
                    <Carousel.Caption className="home-carousel__caption">
                        <h5>Алгоритмы</h5>
                        <p>Изучите различные алгоритмы и структуры данных</p>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
            <Carousel.Item className="home-carousel__link">
                <Link to={routes.constructor}>
                    <img
                        className="home-carousel__img"
                        src={getImageSrc("images/home-carousel/constructor.png")}
                        alt="Конструктор"
                    />
                    <Carousel.Caption className="home-carousel__caption">
                        <h5>Конструктор</h5>
                        <p>Конструктор позволит Вам увидеть работу каждого алгоритма</p>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
            <Carousel.Item className="home-carousel__link">
                <Link to={routes.tests}>
                    <img
                        className="home-carousel__img"
                        src={getImageSrc("images/home-carousel/tests.png")}
                        alt="Тесты"
                    />
                    <Carousel.Caption className="home-carousel__caption">
                        <h5>Тесты</h5>
                        <p>Закрепите свои знания, пройдя тесты</p>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="home-carousel__img"
                    src={getImageSrc("images/home-carousel/work-in-progress.png")}
                    alt="Тесты"
                />
                <Carousel.Caption className="home-carousel__caption">
                    <h5>Ведётся разработка</h5>
                    <p>Сайт находится в стадии разработки. Информация будет дополняться</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default HomeCarousel;