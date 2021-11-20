import React from "react";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";
import images from "../../constants/images";
import routes from "../../utils/routes";

const HomeInfo = () => (
  <Paper className="home">
    <img className="home__logo" src={images.logo} alt="algorithmix-logo" />
    <div className="home-info home-info--reverse">
      <div className="home-info__text">
        Алгоритмы необходимо знать всем! Представленные на сайте материалы помогут Вам изучить или повторить информацию
        по различным <Link to={routes.algorithms.main}>алгоритмам и структурам данных</Link>.
      </div>
      <img className="home-info__image" src={images.home.algorithms} alt="home-algorithms" />
    </div>
    <div className="home-info">
      <div className="home-info__text">
        Остались вопросы, связанные с алгоритмами? <Link to={routes.constructor.main}>Конструктор</Link> поможет Вам
        визуализировать их работу, а также более подробно разобраться с каждым из них.
      </div>
      <img className="home-info__image" src={images.home.constructor} alt="home-constructor" />
    </div>
    <div className="home-info home-info--reverse">
      <div className="home-info__text">
        Зарегистрируйтесь в приложении и закрепите полученные знания, пройдя интересные и сложные{" "}
        <Link to={routes.tests.main}>тесты</Link> по изученным алгоритмам и структурам данных.
      </div>
      <img className="home-info__image" src={images.home.tests} alt="home-tests" />
    </div>
    <div className="home-info">
      <div className="home-info__text">
        Сайт находится в стадии разработки. Информация будет дополняться.
      </div>
      <img className="home-info__image" src={images.home.workInProgress} alt="home-work-in-progress" />
    </div>
  </Paper>
);

export default HomeInfo;
