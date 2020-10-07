import React from "react";
import { Card } from "react-bootstrap";
import { getImageSrc } from "../../../utils/getImageSrc";
import bem from "../../../utils/bem";
import Button from "../../../components/Button/Button";
import styles from "./AlgorithmCard.module.scss";

const block = bem(styles);

const AlgorithmCard = ({ algorithm }) => {
    return (
        <Card className="mb-3">
            <Card.Img variant="top" src={getImageSrc(algorithm.imageUrl)}/>
            <Card.Body className={block("body")}>
                <h5 className="card-title">{algorithm.name}</h5>
                <div className={block("button-container")}>
                    <Button>Информация</Button>
                    <Button>Конструктор</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default AlgorithmCard;