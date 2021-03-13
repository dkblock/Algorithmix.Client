import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Button from "../_common/Button/Button";
import { getImageSrc } from "../../utils/get-image-src";
import routes from "../../utils/routes";

const AlgorithmCard = ({ algorithm }) => {
    return (
        <Card className="mb-3 algorithm-card">
            <Card.Img variant="top" src={getImageSrc(algorithm.imageUrl)}/>
            <Card.Body className="algorithm-card__body">
                <h5 className="card-title">{algorithm.name}</h5>
                <div className="algorithm-card__button-container">
                    <Link to={`${routes.algorithms}/${algorithm.id}`}>
                        <Button>Информация</Button>
                    </Link>
                    <Button>Конструктор</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default AlgorithmCard;