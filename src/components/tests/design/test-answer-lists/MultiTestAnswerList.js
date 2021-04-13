import React, { useMemo } from "react";
import { IconButton, iconTypes } from "../../../_common/Icon";
import { List } from "../../../_common/List";
import TextField from "../../../_common/TextField";

const prepareAnswers = (answers, onAnswerDelete) =>
  answers.map((answer) => ({
    id: answer.id,
    checked: answer.isCorrect,
    content: (
      <div className="test-answer-list__item">
        <TextField value={answer.value} />
      </div>
    ),
    actions: [
      {
        id: "delete",
        label: "Удалить",
        icon: iconTypes.delete,
        onClick: () => onAnswerDelete(answer),
      },
    ],
  }));

const MultiTestAnswerList = ({ answers, onCreateAnswer }) => {
  const preparedAnswers = useMemo(() => prepareAnswers(answers), [answers]);

  return (
    <div className="test-answer-list">
      <div className="test-answer-list__header">
        Ответы
        <IconButton type={iconTypes.plus} onClick={onCreateAnswer} />
      </div>
      <div className="test-answer-list__items">
        {preparedAnswers.length > 0 ? (
          <List items={preparedAnswers} onCheck={(ids) => console.log(ids)} checkControlType="checkbox" />
        ) : (
          <div>Добавьте ответ</div>
        )}
      </div>
    </div>
  );
};

export default MultiTestAnswerList;
