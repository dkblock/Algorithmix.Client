import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { Paper } from "@mui/material";
import { useCurrentUser, useTitle } from "../../../hooks";
import { fetchPublishedTests } from "../../../store/actions/test";
import { navigateToTestPass, navigateToTestResult } from "../../../utils/navigator";
import TestListItem from "./test-list-item";
import Table from "../../_common/table";
import TextField from "../../_common/text-field";
import Button, { colors } from "../../_common/button";
import { iconTypes } from "../../_common/icon";
import palette from "../../../utils/palette";
import "./test-list.scss";

const getColumns = (isAuthenticated, onTestResultClick, onTestStartClick) => [
  { id: "name", label: "Название", width: 450 },
  {
    id: "status",
    label: "Статус",
    width: 200,
    renderCell: (row) =>
      row.userResult ? <span style={{ color: palette.success.main }}>Выполнен</span> : "Не выполнен",
  },
  { id: "questionsCount", label: "Вопросы", align: "center" },
  { id: "createdDate", label: "Создан" },
  {
    id: "actions",
    label: "",
    align: "right",
    width: 200,
    renderCell: (row) =>
      isAuthenticated &&
      (row.userResult ? (
        <Button
          className="w-100"
          color={colors.success}
          endIcon={iconTypes.stats}
          onClick={() => onTestResultClick(row.id)}
        >
          Результат
        </Button>
      ) : (
        <Button
          className="w-100"
          color={colors.primary}
          endIcon={iconTypes.play}
          onClick={() => onTestStartClick(row.id)}
        >
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
              <TextField
                value={searchText}
                variant="standard"
                icon={iconTypes.search}
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
