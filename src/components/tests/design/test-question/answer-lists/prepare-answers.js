import React from "react";
import { iconTypes } from "../../../../_common/icon";
import TestAnswerListItem from "./test-answer-list-item";

export const prepareAnswers = (answers, onAnswerValueChange, onAnswerValueFocusOut, onAnswerDelete) =>
  answers.map((answer) => ({
    id: answer.id,
    checked: answer.isCorrect,
    content: (
      <TestAnswerListItem
        answer={answer}
        onAnswerValueChange={onAnswerValueChange}
        onAnswerValueFocusOut={onAnswerValueFocusOut}
      />
    ),
    actions: [
      {
        id: "delete",
        label: "Удалить",
        icon: iconTypes.delete,
        onClick: () => onAnswerDelete(answer.id),
      },
    ],
  }));