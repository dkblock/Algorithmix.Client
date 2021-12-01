import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { Paper } from "@mui/material";
import { useCurrentUser, useTitle } from "../../../hooks";
import { fetchPublishedTests } from "../../../store/actions/test";
import { navigateToTestPass, navigateToTestResult } from "../../../utils/navigator";
import TestListItem from "./test-list-item";
import Table, { DateTimeCell } from "../../_common/table";
import TextField from "../../_common/text-field";
import Button, { colors } from "../../_common/button";
import { Icon, iconTypes } from "../../_common/icon";
import "./test-list.scss";

const getColumns = (isAuthenticated, onTestResultClick, onTestStartClick) => [
  { id: "name", label: "Название", width: 450 },
  {
    id: "status",
    label: "Выполнен",
    width: 200,
    align: "center",
    renderCell: (row) => (
      <Icon
        type={row.userResult ? iconTypes.done : iconTypes.clear}
        color={row.userResult ? colors.success : colors.danger}
      />
    ),
  },
  { id: "questionsCount", label: "Вопросы", align: "center", sortable: false },
  {
    id: "createdDate",
    label: "Создан",
    renderCell: ({ createdDate }) => <DateTimeCell dateTime={createdDate} />,
  },
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
    createdDate: new Date(test.createdDate),
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
  const { tests, totalCount, isFetching, searchText: search, pageIndex, pageSize, sortBy, sortDirection } = useSelector(
    (state) => state.publishedTest
  );

  const { isAuthenticated } = useCurrentUser();
  const [searchText, setSearchText] = useState(search);

  useTitle("Тесты", "Тесты");

  useEffect(() => {
    dispatch(fetchPublishedTests({ searchText, pageIndex, pageSize, sortBy, sortDirection }));
  }, [dispatch]);

  const handleSearch = useCallback(
    (params) => {
      dispatch(fetchPublishedTests({ searchText, pageIndex, pageSize, sortBy, sortDirection, ...params }));
    },
    [searchText, pageIndex, pageSize, sortBy, sortDirection]
  );

  const handleSearchDebounced = useDebouncedCallback(({ searchText }) => {
    handleSearch({ searchText });
  }, 500);

  const handleSearchTextChange = useCallback((value) => {
    setSearchText(value);
    handleSearchDebounced({ searchText: value });
  }, []);

  const handleSort = useCallback(
    ({ sortBy: orderBy, sortDirection: sortOrder }) => {
      handleSearch({ sortBy: orderBy, sortDirection: sortOrder });
    },
    [searchText]
  );

  const handlePageChange = useCallback(
    (newPageIndex) => {
      handleSearch({ pageIndex: newPageIndex });
    },
    [searchText]
  );

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
          isFetching={isFetching}
          totalCount={totalCount}
          pageIndex={pageIndex}
          pageSize={pageSize}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSort={handleSort}
          onPageChange={handlePageChange}
          onRowExpand={(row) => <TestListItem test={row} />}
          toolbar={
            <Table.Toolbar title="Тесты" count={totalCount}>
              <TextField
                value={searchText}
                variant="filled"
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
