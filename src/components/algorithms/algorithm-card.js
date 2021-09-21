import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import Divider from "@mui/material/Divider";
import Button, { colors } from "../_common/button";
import { iconTypes } from "../_common/icon";
import { getFileSrc } from "../../utils/get-file-src";
import { navigateToAlgorithm, navigateToConstructorAlgorithm } from "../../utils/navigator";

const AlgorithmCard = ({ algorithm }) => {
  const headerProps = { align: "center", fontFamily: "inherit", fontWeight: 500 };

  const onInfoButtonClick = () => navigateToAlgorithm(algorithm.id);
  const onConstructorButtonClick = () => navigateToConstructorAlgorithm(algorithm.id);

  return (
    <Card className="algorithm-card">
      <CardActionArea className="algorithm-card__body" onClick={onInfoButtonClick}>
        <CardHeader className="algorithm-card__header" title={algorithm.name} titleTypographyProps={headerProps} />
        <Divider />
        <CardMedia>
          <img className="w-100" src={getFileSrc(algorithm.imageUrl)} alt="algorithm-img" />
        </CardMedia>
      </CardActionArea>
      <Divider />
      <CardActions className="algorithm-card__button-container">
        <Button color={colors.success} startIcon={iconTypes.info} onClick={onInfoButtonClick}>
          Информация
        </Button>
        <Button startIcon={iconTypes.constructor} onClick={onConstructorButtonClick}>
          Конструктор
        </Button>
      </CardActions>
    </Card>
  );
};

export default AlgorithmCard;
