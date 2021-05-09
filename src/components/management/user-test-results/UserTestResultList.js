import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTitle } from "../../../hooks";
import { fetchUserTestResults, showDeleteUserTestResultModal } from "../../../store/actions/user-test-result";
import { navigateToUserTestResult } from "../../../utils/navigator";
import Table, { TableToolbar } from "../../_common/Table";
import { iconTypes } from "../../_common/Icon";

const getActions = (onTestResultDelete) => [
  {
    label: "Подробно",
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
  { field: "fullName", headerName: "Имя" },
  { field: "groupName", headerName: "Группа" },
  { field: "testName", headerName: "Тест" },
  { field: "result", headerName: "Результат" },
  { field: "passedDate", headerName: "Пройден", type: "dateTime" },
];

const prepareTestResults = (testResults) =>
  testResults.map((result) => ({
    id: `${result.test.id}__${result.user.id}`,
    testId: result.test.id,
    userId: result.user.id,
    fullName: `${result.user.firstName} ${result.user.lastName}`,
    groupName: result.user.group.name,
    testName: result.test.name,
    result: `${result.result}%`,
    passedDate: new Date(result.passingTime),
  }));

const UserTestResultList = () => {
  const dispatch = useDispatch();
  const { testResults, isFetching } = useSelector((state) => state.userTestResult);

  useTitle("Результаты", "Результаты");

  useEffect(() => {
    dispatch(fetchUserTestResults());
  }, [dispatch]);

  const handleTestResultDelete = useCallback((testResult) => dispatch(showDeleteUserTestResultModal({ testResult })), [
    dispatch,
  ]);

  const actions = useMemo(() => getActions(handleTestResultDelete), [handleTestResultDelete]);
  const preparedTestResults = useMemo(() => prepareTestResults(testResults), [testResults]);

  return (
    <Table
      toolbar={<TableToolbar title="Результаты" count={testResults.length} />}
      columns={columns}
      data={preparedTestResults}
      actions={actions}
      isFetching={isFetching}
      sortBy="passedDate"
      sortDirection="desc"
    />
  );
};

export default UserTestResultList;
