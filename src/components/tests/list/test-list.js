import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { Paper } from "@mui/material";
import { useCurrentUser, useTitle } from "../../../hooks";
import { fetchPublishedTests } from "../../../store/actions/test";
import { navigateToTestPass, navigateToTestResult } from "../../../utils/navigator";
import "./test-list.scss";
import TestListItem from "./test-list-item";
import Table from "../../_common/new-table";
import Checkbox from "../../_common/checkbox";
import TextField from "../../_common/text-field";
import Button, { colors } from "../../_common/button";
import { iconTypes } from "../../_common/icon";
import palette from "../../../utils/palette";

const getColumns = (isAuthenticated, onTestResultClick, onTestStartClick) => [
  { id: "name", label: "Название", width: 450 },
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
    algorithms: test.algorithms,
    questions: test.questions,
    createdBy: test.createdBy,
    averageResult: test.averageResult,
    userResult: test.userResult,
  }));

const TestList = () => {
  const dispatch = useDispatch();
  const { publishedTests: tests, isFetching } = useSelector((state) => state.test);

  const { isAuthenticated } = useCurrentUser();
  const [searchText, setSearchText] = useState("");

  useTitle("Тесты", "Тесты");

  useEffect(() => {
    dispatch(fetchPublishedTests({ searchText }));
  }, [dispatch]);

  const handleSearch = useDebouncedCallback((searchText) => {
    dispatch(fetchPublishedTests({ searchText }));
  }, 500);

  const handleSearchTextChange = useCallback((value) => {
    setSearchText(value);
    handleSearch(value);
  }, []);

  const handleTestStart = (id) => navigateToTestPass(id);
  const handleTestResult = (id) => navigateToTestResult(id);

  const columns = getColumns(isAuthenticated, handleTestResult, handleTestStart);
  const preparedTests = prepareTests(tests);

  return (
    <div className="test-list-container">
      <Paper className="test-list">
        <Table
          columns={columns}
          data={preparedTests}
          onRowExpand={(row) => <TestListItem test={row} />}
          isFetching={isFetching}
          toolbar={
            <Table.Toolbar title="Тесты" count={preparedTests.length}>
              <Checkbox value={true} label="Только выполненные" onChange={() => {}} />
              <TextField
                value={searchText}
                label="Поиск"
                onChange={handleSearchTextChange}
                onFocus={() => {}}
                onFocusOut={() => {}}
              />
            </Table.Toolbar>
          }
        />
      </Paper>
    </div>
  );
};

export default TestList;
