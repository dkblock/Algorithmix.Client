import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Divider from "@material-ui/core/Divider";
import Button, { colors } from "../_common/Button";
import { iconTypes } from "../_common/Icon";
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
