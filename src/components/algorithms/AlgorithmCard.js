import React from "react";
import { Card } from "react-bootstrap";
import Button, { colors } from "../_common/Button";
import { iconTypes } from "../_common/Icon";
import { getImageSrc } from "../../utils/get-image-src";
import { navigateToAlgorithm } from "../../utils/navigator";

const AlgorithmCard = ({ algorithm }) => {
    const onInfoButtonClick = () => navigateToAlgorithm(algorithm.id);

    return (
        <Card className="mb-3 algorithm-card">
            <Card.Header className="text-center bg-white pt-3">
                <h5>{algorithm.name}</h5>
            </Card.Header>
            <Card.Img variant="top" src={getImageSrc(algorithm.imageUrl)}/>
            <Card.Body className="algorithm-card__body">
                <div className="algorithm-card__button-container">
                    <Button color={colors.default} startIcon={iconTypes.info} onClick={onInfoButtonClick}>
                        Информация
                    </Button>
                    <Button startIcon={iconTypes.constructor}>Конструктор</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default AlgorithmCard;