import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useExecutiveRole } from "../../../hooks";
import { List } from "../../_common/List";
import Loader from "../../_common/Loader";
import TextField from "../../_common/TextField";
import { selectTest } from "../../../store/actions/test";

const prepareTests = (tests, selectedTestId, isExecutive, onTestClick, onTestEdit, onTestDelete) =>
  tests.map((test) => ({
    id: test.id,
    primaryText: test.name,
    secondaryText: test.algorithm.name,
    isSelected: test.id === selectedTestId,
    onClick: () => onTestClick(test.id),
  }));

const TestList = () => {
  const dispatch = useDispatch();
  const isExecutive = useExecutiveRole();
  const { tests, selectedTestId, isFetching } = useSelector((state) => state.test);

  const handleTestClick = useCallback(
    (testId) => {
      dispatch(selectTest({ testId }));
    },
    [dispatch]
  );

  const preparedTests = useMemo(() => prepareTests(tests, selectedTestId, isExecutive, handleTestClick), [
    handleTestClick,
    isExecutive,
    selectedTestId,
    tests,
  ]);

  return (
    <div className="test-list">
      <div className="test-list__header">
        <TextField label="Поиск здоровый" />
      </div>

      {isFetching ? (
        <Loader className="test-list__loader" size="medium" />
      ) : (
        <div className="test-list__items">
          <List items={preparedTests} />
        </div>
      )}
    </div>
  );
};

export default TestList;
