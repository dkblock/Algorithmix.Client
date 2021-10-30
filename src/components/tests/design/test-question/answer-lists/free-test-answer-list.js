import React, { useMemo } from "react";
import Button, { buttonTypes, colors } from "../../../../_common/button";
import { iconTypes } from "../../../../_common/icon";
import TestAnswerListItem from "./test-answer-list-item";

const prepareAnswer = (answers) => (answers.length === 0 ? null : answers[0]);

const FreeTestAnswerList = ({ answers, onAnswerCreate, onAnswerValueChange, onAnswerValueFocusOut }) => {
  const preparedAnswer = useMemo(() => prepareAnswer(answers, onAnswerValueChange), [answers, onAnswerValueChange]);

  return (
    <div className="test-answer-list">
      <div className="test-answer-list__header">
        <span>Ответы</span>
        {!preparedAnswer && (
          <Button color={colors.success} type={buttonTypes.text} startIcon={iconTypes.plus} onClick={onAnswerCreate}>
            Новый ответ
          </Button>
        )}
      </div>
      <div className="test-answer-list__items">
        {preparedAnswer ? (
          <TestAnswerListItem
            answer={preparedAnswer}
            label="Правильный ответ"
            onAnswerValueChange={onAnswerValueChange}
            onAnswerValueFocusOut={onAnswerValueFocusOut}
          />
        ) : (
          <div className="m-auto pt-5">Нет ответов</div>
        )}
      </div>
    </div>
  );
};

export default FreeTestAnswerList;
