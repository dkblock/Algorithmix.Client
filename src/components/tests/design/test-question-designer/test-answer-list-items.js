import React from "react";
import testQuestionTypes from "../../../../constants/test-question-types";
import { iconTypes } from "../../../_common/icon";
import { SortableList } from "../../../_common/list";
import TestAnswerListItem from "./test-answer-list-item";

const prepareAnswers = (answers, onAnswerUpdate, onAnswerDelete) =>
  answers.map((answer) => ({
    id: answer.id,
    content: <TestAnswerListItem answer={answer} label="Ответ" onAnswerUpdate={onAnswerUpdate} />,
    actions: [
      {
        id: "delete",
        label: "Удалить",
        icon: iconTypes.delete,
        onClick: () => onAnswerDelete(answer.id),
      },
    ],
  }));

const TestAnswerListItems = ({ answers, questionType, isTestSaving, onAnswerUpdate, onAnswerDelete, onAnswerMove }) => (
  <div className="test-answer-list__items">
    {answers.length === 0 ? (
      <div className="m-auto pt-5">Нет ответов</div>
    ) : questionType === testQuestionTypes.freeAnswerQuestion ? (
      <TestAnswerListItem answer={answers[0]} label="Правильный ответ" onAnswerUpdate={onAnswerUpdate} />
    ) : (
      <SortableList
        items={prepareAnswers(answers, onAnswerUpdate, onAnswerDelete)}
        disabled={isTestSaving}
        onSwap={onAnswerMove}
      />
    )}
  </div>
);

export default TestAnswerListItems;
