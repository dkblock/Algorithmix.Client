import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import Divider from "@mui/material/Divider";
import { getFileSrc } from "../../../utils/get-file-src";
import { navigateToAlgorithmDescription, navigateToAlgorithmConstructor } from "../../../utils/navigator";
import Button, { colors } from "../../_common/button";
import { iconTypes } from "../../_common/icon";

const SpecificButton = ({ algorithmId, hasData, color, label, icon, onNavigate }) => {
  const handleClick = () => (hasData ? onNavigate(algorithmId) : null);

  return (
    <Button className="algorithm-card__button" color={color} startIcon={icon} onClick={handleClick} disabled={!hasData}>
      {label}
    </Button>
  );
};

const AlgorithmCard = ({ algorithm }) => {
  const headerProps = { align: "center", fontFamily: "inherit", fontWeight: 500 };

  const handleCardClick = () => (algorithm.hasDescription ? navigateToAlgorithmDescription(algorithm.id) : null);

  return (
    <Card className="algorithm-card">
      <CardActionArea className="algorithm-card__body" onClick={handleCardClick}>
        <CardHeader className="algorithm-card__header" title={algorithm.name} titleTypographyProps={headerProps} />
        <Divider />
        <CardMedia>
          <img className="w-100" src={getFileSrc(algorithm.imageUrl)} alt="algorithm-img" />
        </CardMedia>
      </CardActionArea>
      <Divider />
      <CardActions className="algorithm-card__button-container">
        <SpecificButton
          algorithmId={algorithm.id}
          hasData={algorithm.hasDescription}
          label="Описание"
          color={colors.success}
          icon={iconTypes.info}
          onNavigate={(algorithmId) => navigateToAlgorithmDescription(algorithmId)}
        />
        <SpecificButton
          algorithmId={algorithm.id}
          hasData={algorithm.hasConstructor}
          label="Конструктор"
          color={colors.primary}
          icon={iconTypes.constructor}
          onNavigate={(algorithmId) => navigateToAlgorithmConstructor(algorithmId)}
        />
      </CardActions>
    </Card>
  );
};

export default AlgorithmCard;
