import React from "react";
import Table from "../../_common/table";
import { Icon, iconTypes } from "../../_common/icon";
import colors from "../../../constants/colors";
import UserAnswer from "./user-answer";

const columns = [
  { id: "questionNumber", label: "Вопрос", align: "center" },
  {
    id: "result",
    label: "Результат",
    align: "center",
    renderCell: ({ isCorrect }) => (
      <Icon type={isCorrect ? iconTypes.done : iconTypes.clear} color={isCorrect ? colors.success : colors.danger} />
    ),
  },
];

const prepareUserAnswers = (userAnswers) =>
  userAnswers.map((userAnswer, i) => ({
    ...userAnswer,
    id: userAnswer.question.id,
    questionNumber: i + 1,
  }));

const UserAnswersList = ({ testResult, own }) => {
  const preparedUserAnswers = prepareUserAnswers(testResult.userAnswers);

  return (
    <Table
      columns={columns}
      data={preparedUserAnswers}
      onRowExpand={(row) => <UserAnswer userAnswer={row} own={own} />}
    />
  );
};

export default UserAnswersList;
