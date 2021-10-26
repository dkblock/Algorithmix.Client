import React from "react";
import Table from "../../_common/table";
import CompletionResult from "../../_common/completion-result";
import TestQuestionStats from "./test-question-stats";

const columns = [
  { id: "questionNumber", label: "Вопрос", align: "center" },
  { id: "passesCount", label: "Всего ответов", align: "center" },
  { id: "correctAnswersCount", label: "Правильных ответов", align: "center" },
  { id: "incorrectAnswersCount", label: "Неправильных ответов", align: "center" },
  {
    id: "averageResult",
    label: "Средний результат",
    align: "center",
    renderCell: ({ averageResult }) => <CompletionResult value={averageResult} size="extra-small" />,
  },
];

const prepareQuestionStats = (questionStats) =>
  questionStats.map((questionStat, i) => ({
    ...questionStat,
    id: questionStat.question.id,
    questionNumber: i + 1,
  }));

const TestQuestionStatsList = ({ questionStats }) => {
  const preparedQuestions = prepareQuestionStats(questionStats);

  return (
    <Table
      columns={columns}
      data={preparedQuestions}
      onRowExpand={(questionStats) => <TestQuestionStats questionStats={questionStats} />}
    />
  );
};

export default TestQuestionStatsList;
