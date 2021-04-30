import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTests } from "../../../store/actions/test";
import Table from "../../_common/Table";
import { iconTypes } from "../../_common/Icon";

const columns = [
  { field: "name", headerName: "Название теста", flex: 1 },
  { field: "algorithmName", headerName: "Алгоритм", flex: 1 },
  { field: "questionsCount", headerName: "Количество вопросов", flex: 1 },
];

const actions = [
  {
    label: "Редактировать",
    icon: iconTypes.edit,
    onClick: () => {},
  },
  {
    label: "Удалить",
    icon: iconTypes.delete,
    onClick: () => {},
  },
];

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

  const preparedTests = useMemo(() => prepareTests(tests), [tests]);

  return <Table columns={columns} data={preparedTests} actions={actions} isFetching={isFetching} />;
};

export default TestList;
