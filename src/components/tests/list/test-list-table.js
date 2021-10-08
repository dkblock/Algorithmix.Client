import React from "react";
import { useCurrentUser } from "../../../hooks";
import { navigateToTestPass, navigateToTestResult } from "../../../utils/navigator";
import Button, { colors } from "../../_common/button";
import { iconTypes } from "../../_common/icon";
import TextField from "../../_common/text-field";
import Table from "../../_common/new-table";
import palette from "../../../utils/palette";

const getColumns = (isAuthenticated, onTestResultClick, onTestStartClick) => [
  { id: "name", label: "Название" },
  {
    id: "status",
    label: "Статус",
    renderCell: (row) =>
      row.userResult ? <span style={{ color: palette.success.main }}>Выполнен</span> : "Не выполнен",
  },
  { id: "questionsCount", label: "Вопросы" },
  { id: "createdDate", label: "Создан" },
  {
    id: "actions",
    label: "",
    align: "right",
    renderCell: (row) =>
      isAuthenticated &&
      (row.userResult ? (
        <Button color={colors.success} endIcon={iconTypes.stats} onClick={() => onTestResultClick(row.id)}>
          Результат
        </Button>
      ) : (
        <Button color={colors.primary} endIcon={iconTypes.play} onClick={() => onTestStartClick(row.id)}>
          Начать тест
        </Button>
      )),
  },
];

const prepareTests = (tests) =>
  tests.map((test) => ({
    id: test.id,
    createdDate: new Date(test.createdDate).toLocaleDateString("ru-RU"),
    name: test.name,
    questionsCount: test.questions.length,
    userResult: test.userResult,
  }));

const TestListTable = ({ tests }) => {
  const { isAuthenticated } = useCurrentUser();

  const handleTestStart = (id) => navigateToTestPass(id);
  const handleTestResult = (id) => navigateToTestResult(id);

  const preparedTests = prepareTests(tests);
  const columns = getColumns(isAuthenticated, handleTestResult, handleTestStart);

  return (
    <Table
      columns={columns}
      data={preparedTests}
      toolbar={
        <Table.Toolbar title="Тесты" count={preparedTests.length}>
          <TextField value="" label="Поиск" onChange={() => {}} onFocus={() => {}} onFocusOut={() => {}} />
        </Table.Toolbar>
      }
    />
  );
};

export default TestListTable;
