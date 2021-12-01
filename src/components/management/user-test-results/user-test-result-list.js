import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { useTitle } from "../../../hooks";
import { fetchUserTestResults, showDeleteUserTestResultModal } from "../../../store/actions/user-test-result";
import { navigateToUserTestResult } from "../../../utils/navigator";
import colors from "../../../constants/colors";
import Table, { DateTimeCell } from "../../_common/table";
import { iconTypes } from "../../_common/icon";
import TextField from "../../_common/text-field";
import { Dropdown } from "../../_common/dropdown";
import CompletionResult from "../../_common/completion-result";

const getActions = (onTestResultDelete) => () => [
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
  { id: "testName", label: "Тест", width: 350 },
  {
    id: "result",
    label: "Результат",
    align: "center",
    renderCell: ({ result }) => <CompletionResult value={result} size="extra-small" color={colors.primary} />,
  },
  { id: "passingTime", label: "Пройден", renderCell: ({ passingTime }) => <DateTimeCell dateTime={passingTime} /> },
];

const prepareTestResults = (testResults) =>
  testResults.map((result) => ({
    id: `${result.test.id}__${result.user.id}`,
    testId: result.test.id,
    userId: result.user.id,
    fullName: `${result.user.lastName} ${result.user.firstName}`,
    groupName: result.user.group.name,
    testName: result.test.name,
    result: result.result,
    passingTime: new Date(result.passingTime),
  }));

const UserTestResultList = () => {
  const dispatch = useDispatch();
  const { groups } = useSelector((state) => state.group);
  const {
    testResults,
    totalCount,
    isFetching,
    searchText: search,
    pageIndex,
    pageSize,
    sortBy,
    sortDirection,
  } = useSelector((state) => state.userTestResult);

  const [searchText, setSearchText] = useState(search);
  const [groupId, setGroupId] = useState(-1);

  useTitle("Результаты", "Результаты");

  useEffect(() => {
    dispatch(fetchUserTestResults({ searchText, groupId, pageIndex, pageSize, sortBy, sortDirection }));
  }, [dispatch]);

  const handleSearch = useCallback(
    (params) => {
      dispatch(fetchUserTestResults({ searchText, groupId, pageIndex, pageSize, sortBy, sortDirection, ...params }));
    },
    [dispatch, searchText, groupId, pageIndex, pageSize, sortBy, sortDirection]
  );

  const handleSearchDebounced = useDebouncedCallback(({ searchText }) => {
    handleSearch({ searchText });
  }, 500);

  const handleSearchTextChange = useCallback(
    (value) => {
      setSearchText(value);
      handleSearchDebounced({ searchText: value });
    },
    [groupId]
  );

  const handleGroupIdChange = useCallback(
    (value) => {
      setGroupId(value);
      handleSearch({ groupId: value });
    },
    [searchText]
  );

  const handleSort = useCallback(
    ({ sortBy: orderBy, sortDirection: sortOrder }) => {
      handleSearch({ sortBy: orderBy, sortDirection: sortOrder });
    },
    [groupId, searchText]
  );

  const handlePageChange = useCallback(
    (newPageIndex) => {
      handleSearch({ pageIndex: newPageIndex });
    },
    [groupId, searchText]
  );

  const handleTestResultDelete = useCallback((testResult) => dispatch(showDeleteUserTestResultModal({ testResult })), [
    dispatch,
  ]);

  const actions = useMemo(() => getActions(handleTestResultDelete), [handleTestResultDelete]);
  const preparedTestResults = useMemo(() => prepareTestResults(testResults), [testResults]);
  const groupItems = [{ value: -1, label: "Все" }, ...groups.map((group) => ({ value: group.id, label: group.name }))];

  return (
    <Table
      columns={columns}
      data={preparedTestResults}
      actions={actions}
      isFetching={isFetching}
      totalCount={totalCount}
      pageIndex={pageIndex}
      pageSize={pageSize}
      sortBy={sortBy}
      sortDirection={sortDirection}
      onSort={handleSort}
      onPageChange={handlePageChange}
      toolbar={
        <Table.Toolbar title="Результаты" count={totalCount}>
          <Dropdown
            className="management-table__toolbar-item"
            label="Группа"
            items={groupItems}
            value={groupId}
            onChange={handleGroupIdChange}
          />
          <TextField
            className="management-table__toolbar-item"
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
  );
};

export default UserTestResultList;
