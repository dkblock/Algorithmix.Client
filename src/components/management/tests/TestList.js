import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTest, fetchTests, showDeleteTestModal } from "../../../store/actions/test";
import Table from "../../_common/Table";
import { iconTypes } from "../../_common/Icon";
import { navigateToTestDesigner } from "../../../utils/navigator";

const columns = [
  { field: "name", headerName: "Название теста", flex: 1 },
  { field: "algorithmName", headerName: "Алгоритм", flex: 1 },
  { field: "questionsCount", headerName: "Количество вопросов", flex: 1 },
];

const getActions = (onTestEdit, onTestDelete) => ([
  {
    label: "Редактировать",
    icon: iconTypes.edit,
    onClick: (test) => onTestEdit(test),
  },
  {
    label: "Удалить",
    icon: iconTypes.delete,
    onClick: (test) => onTestDelete(test),
  },
]);

const prepareTests = (tests) =>
  tests.map((test) => ({
    id: test.id,
    name: test.name,
    algorithmName: test.algorithm.name,
    questionsCount: test.questions.length,
  }));

const TestList = () => {
  const dispatch = useDispatch();
  const { tests, isFetching } = useSelector((state) => state.test);

  useEffect(() => {
    dispatch(fetchTests());
  }, [dispatch]);

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

  const actions = useMemo(() => getActions(handleTestEdit, handleTestDelete), [handleTestDelete, handleTestEdit]);
  const preparedTests = useMemo(() => prepareTests(tests), [tests]);

  return <Table columns={columns} data={preparedTests} actions={actions} isFetching={isFetching} />;
};

export default TestList;
