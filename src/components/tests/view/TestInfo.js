import React from "react";
import Paper from "@material-ui/core/Paper";
import { navigateToTestPass } from "../../../utils/navigator";
import { getImageSrc } from "../../../utils/get-image-src";
import Button, { colors } from "../../_common/Button";

const TestInfo = ({ test }) => {
  const handleTestStart = () => {
    navigateToTestPass(test.id);
  };

  if (!test) return null;

  return (
    <Paper className="test-info">
      <section className="test-info__section--description">
        <h4>{test.name}</h4>
        <hr />
      </section>
      <section className="test-info__section--image">
        <img className="test-info__image" src={getImageSrc(test.algorithm.imageUrl)} alt="algorithm-image" />
        <Button color={colors.success} onClick={handleTestStart}>
          Начать тест
        </Button>
      </section>
    </Paper>
  );
};

export default TestInfo;
