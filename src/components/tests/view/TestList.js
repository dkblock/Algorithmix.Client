import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useExecutiveRole } from "../../../hooks";
import { List } from "../../_common/List";
import Loader from "../../_common/Loader";
import TextField from "../../_common/TextField";
import Button, { colors } from "../../_common/Button";
import { iconTypes } from "../../_common/Icon";
import { selectTest, showCreateTestModal, showDeleteTestModal } from "../../../store/actions/test";
import { navigateToTestEdit } from "../../../utils/navigator";

const prepareTests = (tests, selectedTest, isExecutive, onClick, onTestEdit, onTestDelete) =>
  tests.map((test, index) => ({
    id: test.id,
    primaryText: test.name,
    secondaryText: test.algorithm.name,
    isSelected: test.id === selectedTest.id,
    index: index + 1,
    onClick: () => onClick(test),
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
  const { tests, selectedTest, isFetching } = useSelector((state) => state.test);

  const handleTestClick = useCallback((test) => {
    dispatch(selectTest({ test }));
  }, []);

  const handleTestDelete = useCallback((test) => {
    dispatch(showDeleteTestModal({ test }));
  }, []);

  const handleTestEdit = useCallback((test) => {
    navigateToTestEdit(test.id);
  }, []);

  const handleTestCreate = () => dispatch(showCreateTestModal());

  const preparedTests = prepareTests(
    tests,
    selectedTest,
    isExecutive,
    handleTestClick,
    handleTestEdit,
    handleTestDelete
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
