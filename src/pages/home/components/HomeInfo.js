import React from "react";
import bem from "../../../utils/bem";
import styles from "./HomeInfo.module.scss";

const block = bem(styles);

const HomeInfo = () => (
    <div className={block()}>
        <div className="col-4">
            <div className="section-title text-center">Алгоритмы</div>
            <hr/>
            <div className="main-text">
                Алгоритмы необходимо знать всем! Представленные на сайте материалы помогут Вам изучить или повторить
                информацию
                по различным алгоритмам и структурам данных.
            </div>
        </div>
        <div className="col-4">
            <div className="section-title text-center">Конструктор</div>
            <hr/>
            <div className="main-text">
                Остались вопросы, связанные с алгоритмами? Конструктор поможет Вам визуализировать их работу, а также
                более подробно разобраться с каждым из них.
            </div>
        </div>
        <div className="col-4">
            <div className="section-title text-center">Тесты</div>
            <hr/>
            <div className="main-text">
                Зарегистрируйтесь в приложении и закрепите полученные знания, пройдя интересные и сложные тесты по
                изученным алгоритмам и структурам данных.
            </div>
        </div>
    </div>
);

export default HomeInfo;