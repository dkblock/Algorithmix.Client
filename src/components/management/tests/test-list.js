import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTitle } from "../../../hooks";
import { fetchTests, showCreateTestModal, showDeleteTestModal } from "../../../store/actions/test";
import { navigateToTestDesigner, navigateToTestStats } from "../../../utils/navigator";
import { getMomentFromNow } from "../../../utils/moment";
import Table from "../../_common/new-table";
import { iconTypes } from "../../_common/icon";
import Button, { colors } from "../../_common/button";
import palette from "../../../utils/palette";

const getActions = (onTestEdit, onTestDelete) => [
  {
    label: "Редактировать",
    icon: iconTypes.edit,
    onClick: (test) => onTestEdit(test),
  },
  {
    label: "Статистика",
    icon: iconTypes.stats,
    onClick: (test) => navigateToTestStats(test.id),
  },
  {
    label: "Удалить",
    icon: iconTypes.delete,
    onClick: (test) => onTestDelete(test),
  },
];

const columns = [
  { id: "name", label: "Название", width: 250 },
  {
    id: "status",
    label: "Статус",
    width: 150,
    renderCell: (row) => (
      <span style={{ color: row.status ? palette.success.dark : palette.warning.dark, fontWeight: 600 }}>
        {row.status ? "Опубликован" : "Не опубликован"}
      </span>
    ),
  },
  // { id: "algorithmNames", label: "Алгоритмы" },
  {
    id: "questionsCount",
    label: "Вопросы",
    headerAlign: "center",
    type: "number",
    width: 120,
    renderCell: (row) => <div className="table-cell--center">{row.questionsCount}</div>,
  },
  { id: "createdBy", label: "Автор" },
  { id: "createdDate", label: "Создан", type: "dateTime", renderCell: (row) => row.createdDateInMoment },
  { id: "updatedDate", label: "Изменён", type: "dateTime", renderCell: (row) => row.updatedDateInMoment },
];

const prepareTests = (tests) =>
  tests.map((test) => ({
    id: test.id,
    name: test.name,
    status: test.isPublished,
    algorithmNames: test.algorithms.map(a => a.name).join(", "),
    questionsCount: test.questions.length,
    createdBy: `${test.createdBy.firstName} ${test.createdBy.lastName}`,
    createdDate: new Date(test.createdDate),
    updatedDate: new Date(test.updatedDate),
    createdDateInMoment: getMomentFromNow(test.createdDate),
    updatedDateInMoment: getMomentFromNow(test.updatedDate),
  }));

const TestList = () => {
  const dispatch = useDispatch();
  const { tests, isFetching } = useSelector((state) => state.test);

  useTitle("Тесты", "Тесты");

  useEffect(() => {
    dispatch(fetchTests());
  }, [dispatch]);

  const handleTestDelete = useCallback((test) => dispatch(showDeleteTestModal({ test })), [dispatch]);

  const handleTestEdit = useCallback((test) => navigateToTestDesigner(test.id), []);

  const handleTestCreate = useCallback(() => dispatch(showCreateTestModal()), [dispatch]);

  const actions = useMemo(() => getActions(handleTestEdit, handleTestDelete), [handleTestDelete, handleTestEdit]);
  const preparedTests = useMemo(() => prepareTests(tests), [tests]);

  return (
    <Table
      toolbar={
        <Table.Toolbar title="Тесты" count={tests.length}>
          <Button color={colors.success} startIcon={iconTypes.plus} onClick={handleTestCreate}>
            Новый тест
          </Button>
        </Table.Toolbar>
      }
      columns={columns}
      data={preparedTests}
      actions={actions}
      isFetching={isFetching}
      sortBy="updatedDate"
      sortDirection="desc"
    />
  );
};

export default TestList;
