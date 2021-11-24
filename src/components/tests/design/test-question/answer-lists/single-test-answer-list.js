import React, { useCallback, useMemo } from "react";
import Button, { buttonTypes, colors } from "../../../../_common/button";
import { iconTypes } from "../../../../_common/icon";
import { SortableList } from "../../../../_common/list";
import { prepareAnswers } from "./prepare-answers";

const SingleTestAnswerList = ({
  answers,
  isSaving,
  onAnswerCreate,
  onAnswerDelete,
  onAnswerValueChange,
  onAnswerValueFocusOut,
  onIsCorrectAnswerChange,
  onAnswerMove,
}) => {
  const handleIsCorrectAnswerChange = useCallback(
    (newCorrectAnswerIds) => {
      const answerId = newCorrectAnswerIds[0];
      const newOrderedAnswers = answers.map((answer) => ({ ...answer, isCorrect: answer.id === answerId }));

      onIsCorrectAnswerChange(newOrderedAnswers, newCorrectAnswerIds, answerId);
    },
    [answers, onIsCorrectAnswerChange]
  );

  const preparedAnswers = useMemo(
    () => prepareAnswers(answers, onAnswerValueChange, onAnswerValueFocusOut, onAnswerDelete),
    [answers, onAnswerDelete, onAnswerValueChange, onAnswerValueFocusOut]
  );

  return (
    <div className="test-answer-list">
      <div className="test-answer-list__header">
        Ответы
        <Button
          color={colors.success}
          type={buttonTypes.text}
          startIcon={iconTypes.plus}
          disabled={isSaving}
          onClick={onAnswerCreate}
        >
          Новый ответ
        </Button>
      </div>
      <div className="test-answer-list__items">
        {preparedAnswers.length > 0 ? (
          <SortableList
            items={preparedAnswers}
            onSwap={onAnswerMove}
            onCheck={handleIsCorrectAnswerChange}
            checkControlType="radio"
          />
        ) : (
          <div className="m-auto pt-5">Нет ответов</div>
        )}
      </div>
    </div>
  );
};

export default SingleTestAnswerList;
