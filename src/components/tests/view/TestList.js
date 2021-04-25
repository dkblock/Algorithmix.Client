import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useExecutiveRole } from "../../../hooks";
import { List } from "../../_common/List";
import Loader from "../../_common/Loader";
import TextField from "../../_common/TextField";
import Button, { colors } from "../../_common/Button";
import { iconTypes } from "../../_common/Icon";
import { editTest, selectTest, showCreateTestModal, showDeleteTestModal } from "../../../store/actions/test";
import { navigateToTestDesigner } from "../../../utils/navigator";

const prepareTests = (tests, selectedTestId, isExecutive, onTestClick, onTestEdit, onTestDelete) =>
  tests.map((test) => ({
    id: test.id,
    primaryText: test.name,
    secondaryText: test.algorithm.name,
    isSelected: test.id === selectedTestId,
    onClick: () => onTestClick(test.id),
    actions: isExecutive
      ? [
          {
            id: "edit",
            label: "Редактировать",
            icon: iconTypes.edit,
            onClick: () => onTestEdit(test),
          },
          {
            id: "delete",
            label: "Удалить",
            icon: iconTypes.delete,
            onClick: () => onTestDelete(test),
          },
          {
            id: "stats",
            label: "Статистика",
            icon: iconTypes.stats,
            onClick: () => onTestEdit(test),
          },
        ]
      : null,
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

  const handleTestDelete = useCallback(
    (test) => {
      dispatch(showDeleteTestModal({ test }));
    },
    [dispatch]
  );

  const handleTestEdit = useCallback(
    (test) => {
      dispatch(editTest({ test }));
      navigateToTestDesigner(test.id);
    },
    [dispatch]
  );

  const handleTestCreate = () => dispatch(showCreateTestModal());

  const preparedTests = useMemo(
    () => prepareTests(tests, selectedTestId, isExecutive, handleTestClick, handleTestEdit, handleTestDelete),
    [handleTestClick, handleTestDelete, handleTestEdit, isExecutive, selectedTestId, tests]
  );

  return (
    <div className="test-list">
      <div className="test-list__header">
        <TextField label="Поиск здоровый" />
        {isExecutive && (
          <Button color={colors.success} startIcon={iconTypes.plus} onClick={handleTestCreate}>
            Новый тест
          </Button>
        )}
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
