import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import Divider from "@mui/material/Divider";
import { getFileSrc } from "../../utils/get-file-src";
import { navigateToAlgorithm, navigateToConstructorAlgorithm } from "../../utils/navigator";
import Button, { colors } from "../_common/button";
import { iconTypes } from "../_common/icon";
import Tooltip from "../_common/tooltip";

const ConstructorButton = ({ algorithm }) => {
  const handleClick = () => (algorithm.hasConstructor ? navigateToConstructorAlgorithm(algorithm.id) : null);

  return (
    <Button startIcon={iconTypes.constructor} onClick={handleClick}>
      Конструктор
    </Button>
  );
};

const AlgorithmCard = ({ algorithm }) => {
  const headerProps = { align: "center", fontFamily: "inherit", fontWeight: 500 };

  const handleInfoButtonClick = () => navigateToAlgorithm(algorithm.id);

  return (
    <Card className="algorithm-card">
      <CardActionArea className="algorithm-card__body" onClick={handleInfoButtonClick}>
        <CardHeader className="algorithm-card__header" title={algorithm.name} titleTypographyProps={headerProps} />
        <Divider />
        <CardMedia>
          <img className="w-100" src={getFileSrc(algorithm.imageUrl)} alt="algorithm-img" />
        </CardMedia>
      </CardActionArea>
      <Divider />
      <CardActions className="algorithm-card__button-container">
        <Button color={colors.success} startIcon={iconTypes.info} onClick={handleInfoButtonClick}>
          Информация
        </Button>
        {algorithm.hasConstructor ? (
          <ConstructorButton algorithm={algorithm} />
        ) : (
          <Tooltip title="Недоступно" placement="bottom">
            <ConstructorButton algorithm={algorithm} />
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
};

export default AlgorithmCard;
