import React, { useCallback, useMemo } from "react";
import Divider from "@material-ui/core/Divider";
import { IconButton, iconTypes } from "../../../_common/Icon";
import { SortableList } from "../../../_common/List";
import TestAnswerListItem from "./TestAnswerListItem";

const prepareAnswers = (answers, onAnswerValueChange, onAnswerDelete) =>
  answers.map((answer) => ({
    id: answer.id,
    checked: answer.isCorrect,
    content: <TestAnswerListItem answer={answer} onAnswerValueChange={onAnswerValueChange} />,
    actions: [
      {
        id: "delete",
        label: "Удалить",
        icon: iconTypes.delete,
        onClick: () => onAnswerDelete(answer.id),
      },
    ],
  }));

const MultiTestAnswerList = ({
  answers,
  correctAnswerIds,
  onAnswerCreate,
  onAnswerDelete,
  onAnswerValueChange,
  onIsCorrectAnswerChange,
  onAnswerMove,
}) => {
  const handleIsCorrectAnswerChange = useCallback(
    (newCorrectAnswerIds) => {
      const checked = newCorrectAnswerIds.filter((answerId) => correctAnswerIds.indexOf(answerId) === -1);
      const unchecked = correctAnswerIds.filter((answerId) => newCorrectAnswerIds.indexOf(answerId) === -1);
      const answerId = checked.concat(unchecked)[0];
      const isCorrect = checked.length > unchecked.length;
      const newOrderedAnswers = answers.map((answer) => ({
        ...answer,
        isCorrect: answer.id === answerId ? isCorrect : answer.isCorrect,
      }));

      onIsCorrectAnswerChange(newOrderedAnswers, newCorrectAnswerIds, answerId);
    },
    [answers, correctAnswerIds, onIsCorrectAnswerChange]
  );

  const preparedAnswers = useMemo(() => prepareAnswers(answers, onAnswerValueChange, onAnswerDelete), [
    answers,
    onAnswerDelete,
    onAnswerValueChange,
  ]);

  return (
    <div className="test-answer-list">
      <div className="test-answer-list__header">
        Ответы
        <IconButton type={iconTypes.plus} onClick={onAnswerCreate} />
      </div>
      <Divider/>
      <div className="test-answer-list__items">
        {preparedAnswers.length > 0 ? (
          <SortableList
            items={preparedAnswers}
            onSwap={onAnswerMove}
            onCheck={handleIsCorrectAnswerChange}
            checkControlType="checkbox"
          />
        ) : (
          <div>Добавьте ответ</div>
        )}
      </div>
    </div>
  );
};

export default MultiTestAnswerList;
