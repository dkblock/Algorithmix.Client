import React from "react";
import Button, { buttonTypes, colors } from "../../../_common/button";
import { iconTypes } from "../../../_common/icon";
import testQuestionTypes from "../../../../constants/test-question-types";

const TestAnswerListHeader = ({ questionType, answersCount, isAnswerCreating, onAnswerCreate }) => (
  <div className="test-answer-list__header">
    Ответы
    <Button
      color={colors.success}
      type={buttonTypes.text}
      startIcon={iconTypes.plus}
      isLoading={isAnswerCreating}
      loadingPosition="start"
      disabled={questionType === testQuestionTypes.freeAnswerQuestion && answersCount > 0}
      onClick={onAnswerCreate}
    >
      Новый ответ
    </Button>
  </div>
);

export default TestAnswerListHeader;