import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTitle } from "../../../hooks";
import { fetchUserTestResults, showDeleteUserTestResultModal } from "../../../store/actions/user-test-result";
import { navigateToUserTestResult } from "../../../utils/navigator";
import Table from "../../_common/table";
import { iconTypes } from "../../_common/icon";

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
  { id: "fullName", label: "Имя" },
  { id: "groupName", label: "Группа" },
  { id: "testName", label: "Тест", width: 450 },
  {
    id: "result",
    label: "Результат",
    headerAlign: "center",
    renderCell: (row) => <div className="table-cell--center">{row.result}%</div>,
  },
  { id: "passedDate", label: "Пройден" },
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
    passedDate: new Date(result.passingTime).toLocaleDateString("ru-RU"),
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
console.log(preparedTestResults)
  return (
    <Table
      toolbar={<Table.Toolbar title="Результаты" count={testResults.length} />}
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
