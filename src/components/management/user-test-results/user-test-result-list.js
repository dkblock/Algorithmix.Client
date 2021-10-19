import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { useTitle } from "../../../hooks";
import { fetchUserTestResults, showDeleteUserTestResultModal } from "../../../store/actions/user-test-result";
import { navigateToUserTestResult } from "../../../utils/navigator";
import { stringifyDateTime } from "../../../utils/moment";
import Table from "../../_common/table";
import { iconTypes } from "../../_common/icon";
import TextField from "../../_common/text-field";
import { Dropdown } from "../../_common/dropdown";

const getActions = (onTestResultDelete) => [
  {
    label: "Результат",
    icon: iconTypes.result,
    onClick: (testResult) => navigateToUserTestResult(testResult.testId, testResult.userId),
  },
  {
    label: "Удалить",
    icon: iconTypes.delete,
    onClick: (testResult) => onTestResultDelete(testResult),
  },
];

const columns = [
  { id: "fullName", label: "Имя", width: 300 },
  { id: "groupName", label: "Группа", width: 200 },
  { id: "testName", label: "Тест", width: 450 },
  {
    id: "result",
    label: "Результат",
    renderCell: (row) => <div className="table-cell--center">{row.result}%</div>,
  },
  { id: "passingTime", label: "Пройден" },
];

const prepareTestResults = (testResults) =>
  testResults.map((result) => ({
    id: `${result.test.id}__${result.user.id}`,
    testId: result.test.id,
    userId: result.user.id,
    fullName: `${result.user.firstName} ${result.user.lastName}`,
    groupName: result.user.group.name,
    testName: result.test.name,
    result: result.result,
    passingTime: stringifyDateTime(new Date(result.passingTime)),
  }));

const UserTestResultList = () => {
  const dispatch = useDispatch();
  const { testResults, isFetching } = useSelector((state) => state.userTestResult);
  const { groups } = useSelector((state) => state.group);

  const [searchText, setSearchText] = useState("");
  const [groupId, setGroupId] = useState(-1);
  const [sortBy, setSortBy] = useState("passingTime");
  const [sortDirection, setSortDirection] = useState("desc");

  useTitle("Результаты", "Результаты");

  useEffect(() => {
    dispatch(fetchUserTestResults({ searchText, groupId, sortBy, sortDirection }));
  }, [dispatch]);

  const handleSearch = useDebouncedCallback(() => {
    dispatch(fetchUserTestResults({ searchText, groupId, sortBy, sortDirection }));
  }, 500);

  const handleTestResultDelete = useCallback((testResult) => dispatch(showDeleteUserTestResultModal({ testResult })), [
    dispatch,
  ]);

  const handleSearchTextChange = useCallback(
    (value) => {
      setSearchText(value);
      handleSearch();
    },
    [handleSearch, setSearchText]
  );

  const handleGroupIdChange = useCallback(
    (value) => {
      setGroupId(value);
      handleSearch();
    },
    [setGroupId]
  );

  const handleSort = useCallback(
    ({ sortBy: orderBy, sortDirection: sortOrder }) => {
      setSortBy(orderBy);
      setSortDirection(sortOrder);
      handleSearch();
    },
    [setSortBy, setSortDirection]
  );

  const actions = useMemo(() => getActions(handleTestResultDelete), [handleTestResultDelete]);
  const preparedTestResults = useMemo(() => prepareTestResults(testResults), [testResults]);
  const groupItems = [{ value: -1, label: "Все" }, ...groups.map((group) => ({ value: group.id, label: group.name }))];

  return (
    <Table
      columns={columns}
      data={preparedTestResults}
      actions={actions}
      isFetching={isFetching}
      sortBy={sortBy}
      sortDirection={sortDirection}
      onSort={handleSort}
      toolbar={
        <Table.Toolbar title="Результаты" count={testResults.length}>
          <Dropdown
            className="management-user-tests-results__toolbar-item"
            label="Группа"
            items={groupItems}
            value={groupId}
            onChange={handleGroupIdChange}
          />
          <TextField
            className="management-user-tests-results__toolbar-item"
            value={searchText}
            label="Поиск"
            onChange={handleSearchTextChange}
            onFocus={() => {}}
            onFocusOut={() => {}}
          />
        </Table.Toolbar>
      }
    />
  );
};

export default UserTestResultList;
