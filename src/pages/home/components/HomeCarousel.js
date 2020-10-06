import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import { Carousel } from "react-bootstrap";
import { getImageSrc } from "../../../utils/getImageSrc";
import bem from "../../../utils/bem";
import routes from "../../../utils/routes";
import styles from "./HomeCarousel.module.scss";

const block = bem(styles);

const HomeCarousel = () => {
    return (
        <Carousel className={cn(block(), "unselectable-text")} interval={4000} slide>
            <Carousel.Item className={block("link")}>
                <Link to={routes.algorithms}>
                    <img
                        className={block("img")}
                        src={getImageSrc("home-carousel/algorithms.png")}
                        alt="Алгоритмы"
                    />
                    <Carousel.Caption>
                        <h5>Алгоритмы</h5>
                        <p>Изучите различные алгоритмы и структуры данных</p>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
            <Carousel.Item className={block("link")}>
                <Link to={routes.constructor}>
                    <img
                        className={block("img")}
                        src={getImageSrc("home-carousel/constructor.png")}
                        alt="Конструктор"
                    />
                    <Carousel.Caption>
                        <h5>Конструктор</h5>
                        <p>Конструктор позволит Вам увидеть работу каждого алгоритма</p>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
            <Carousel.Item className={block("link")}>
                <Link to={routes.tests}>
                    <img
                        className={block("img")}
                        src={getImageSrc("home-carousel/tests.png")}
                        alt="Тесты"
                    />
                    <Carousel.Caption>
                        <h5>Тесты</h5>
                        <p>Закрепите свои знания, пройдя тесты</p>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className={block("img")}
                    src={getImageSrc("home-carousel/work-in-progress.png")}
                    alt="Тесты"
                />
                <Carousel.Caption>
                    <h5>Ведётся разработка</h5>
                    <p>Сайт находится в стадии разработки. Информация будет дополняться</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default HomeCarousel;