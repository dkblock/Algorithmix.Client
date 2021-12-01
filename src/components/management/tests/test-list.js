import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { useTitle } from "../../../hooks";
import { fetchTests, showCreateTestModal, showDeleteTestModal } from "../../../store/actions/test";
import { navigateToTestDesign, navigateToTestStats } from "../../../utils/navigator";
import colors from "../../../constants/colors";
import Table, { DateTimeCell } from "../../_common/table";
import { iconTypes } from "../../_common/icon";
import Button from "../../_common/button";
import CompletionResult from "../../_common/completion-result";
import TextField from "../../_common/text-field";
import Switch from "../../_common/switch";
import palette from "../../../utils/palette";

const getActions = (onTestEdit, onTestDelete) => (row) => [
  {
    label: "Статистика",
    icon: iconTypes.stats,
    onClick: (test) => navigateToTestStats(test.id),
  },
  {
    label: "Редактировать",
    icon: iconTypes.edit,
    disabled: !row.hasAccess,
    onClick: (test) => onTestEdit(test),
  },
  {
    label: "Удалить",
    icon: iconTypes.delete,
    disabled: !row.hasAccess,
    onClick: (test) => onTestDelete(test),
  },
];

const columns = [
  { id: "name", label: "Название", width: 450 },
  {
    id: "isPublished",
    label: "Статус",
    width: 150,
    renderCell: (row) => (
      <span style={{ color: row.status ? palette.success.main : palette.warning.main, fontWeight: 600 }}>
        {row.status ? "Опубликован" : "Не опубликован"}
      </span>
    ),
  },
  { id: "questionsCount", label: "Вопросы", align: "center", width: 75, sortable: false },
  {
    id: "averageResult",
    label: "Средний результат",
    align: "center",
    renderCell: (row) => <CompletionResult value={row.averageResult} size="extra-small" color={colors.primary} />,
  },
  { id: "createdBy", label: "Создатель" },
  { id: "createdDate", label: "Создан", renderCell: ({ createdDate }) => <DateTimeCell dateTime={createdDate} /> },
  { id: "updatedDate", label: "Изменён", renderCell: ({ updatedDate }) => <DateTimeCell dateTime={updatedDate} /> },
];

const prepareTests = (tests) =>
  tests.map((test) => ({
    id: test.id,
    name: test.name,
    status: test.isPublished,
    questionsCount: test.questions.length,
    averageResult: test.averageResult,
    hasAccess: test.userHasAccess,
    createdBy: `${test.createdBy.firstName} ${test.createdBy.lastName}`,
    createdDate: new Date(test.createdDate),
    updatedDate: new Date(test.updatedDate),
  }));

const TestList = () => {
  const dispatch = useDispatch();
  const { tests, totalCount, isFetching, searchText: search, pageIndex, pageSize, sortBy, sortDirection } = useSelector(
    (state) => state.test
  );

  const [searchText, setSearchText] = useState(search);
  const [onlyAccessible, setOnlyAccessible] = useState(false);

  useTitle("Тесты", "Тесты");

  useEffect(() => {
    dispatch(fetchTests({ searchText, onlyAccessible, pageIndex, pageSize, sortBy, sortDirection }));
  }, []);

  const handleSearch = useCallback(
    (params) => {
      dispatch(fetchTests({ searchText, onlyAccessible, pageIndex, pageSize, sortBy, sortDirection, ...params }));
    },
    [searchText, onlyAccessible, pageIndex, pageSize, sortBy, sortDirection]
  );

  const handleSearchDebounced = useDebouncedCallback(({ searchText }) => {
    handleSearch({ searchText });
  }, 500);

  const handleSearchTextChange = useCallback(
    (value) => {
      setSearchText(value);
      handleSearchDebounced({ searchText: value });
    },
    [onlyAccessible]
  );

  const handleOnlyAccessibleChange = useCallback(
    (value) => {
      setOnlyAccessible(value);
      handleSearch({ onlyAccessible: value });
    },
    [searchText]
  );

  const handleSort = useCallback(
    ({ sortBy: orderBy, sortDirection: sortOrder }) => {
      handleSearch({ sortBy: orderBy, sortDirection: sortOrder });
    },
    [searchText, onlyAccessible]
  );

  const handlePageChange = useCallback(
    (newPageIndex) => {
      handleSearch({ pageIndex: newPageIndex });
    },
    [searchText, onlyAccessible]
  );

  const handleTestDelete = useCallback((test) => dispatch(showDeleteTestModal({ test })), [dispatch]);
  const handleTestEdit = useCallback((test) => navigateToTestDesign(test.id), []);
  const handleTestCreate = useCallback(() => dispatch(showCreateTestModal()), [dispatch]);

  const actions = useMemo(() => getActions(handleTestEdit, handleTestDelete), [handleTestDelete, handleTestEdit]);
  const preparedTests = useMemo(() => prepareTests(tests), [tests]);

  return (
    <Table
      columns={columns}
      data={preparedTests}
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
        <Table.Toolbar title="Тесты" count={totalCount}>
          <Button color={colors.success} startIcon={iconTypes.plus} onClick={handleTestCreate}>
            Новый тест
          </Button>
          <Switch checked={onlyAccessible} label="Доступные для редактирования" onChange={handleOnlyAccessibleChange} />
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

export default TestList;
