import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { useTitle } from "../../../hooks";
import { fetchAlgorithms, showCreateAlgorithmModal, showDeleteAlgorithmModal } from "../../../store/actions/algorithm";
import { navigateToAlgorithmDesign } from "../../../utils/navigator";
import Table from "../../_common/table";
import Button, { colors } from "../../_common/button";
import { iconTypes } from "../../_common/icon";
import HasDataCell from "./has-data-cell";
import TextField from "../../_common/text-field";
import Switch from "../../_common/switch";

const getActions = (onDeleteAlgorithm) => (row) => [
  {
    label: "Редактировать",
    icon: iconTypes.edit,
    disabled: !row.hasAccess,
    onClick: (algorithm) => navigateToAlgorithmDesign(algorithm.id),
  },
  {
    label: "Удалить",
    icon: iconTypes.delete,
    disabled: !row.hasAccess,
    onClick: (algorithm) => onDeleteAlgorithm(algorithm),
  },
];

const columns = [
  { id: "name", label: "Название" },
  { id: "id", label: "ID" },
  { id: "createdBy", label: "Создатель" },
  {
    id: "hasDescription",
    label: "Описание",
    align: "center",
    renderCell: ({ hasDescription }) => <HasDataCell hasData={hasDescription} />,
  },
  {
    id: "hasConstructor",
    label: "Конструктор",
    align: "center",
    renderCell: ({ hasConstructor }) => <HasDataCell hasData={hasConstructor} />,
  }
];

const prepareAlgorithms = (algorithms) =>
  algorithms.map((algorithm) => ({
    ...algorithm,
    hasAccess: algorithm.userHasAccess,
    createdBy: `${algorithm.createdBy.firstName} ${algorithm.createdBy.lastName}`,
  }));

const AlgorithmList = () => {
  const dispatch = useDispatch();
  const {
    algorithms,
    totalCount,
    isFetching,
    searchText: search,
    pageIndex,
    pageSize,
    sortBy,
    sortDirection,
  } = useSelector((state) => state.algorithm);

  const [searchText, setSearchText] = useState(search);
  const [onlyAccessible, setOnlyAccessible] = useState(false);

  useTitle("Алгоритмы", "Алгоритмы");

  useEffect(() => {
    dispatch(fetchAlgorithms({ searchText, onlyAccessible, pageIndex, pageSize, sortBy, sortDirection }));
  }, []);

  const handleSearch = useCallback(
    (params) => {
      dispatch(fetchAlgorithms({ searchText, onlyAccessible, pageIndex, pageSize, sortBy, sortDirection, ...params }));
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

  const handleCreateAlgorithm = useCallback(() => dispatch(showCreateAlgorithmModal()), [dispatch]);
  const handleDeleteAlgorithm = useCallback((algorithm) => dispatch(showDeleteAlgorithmModal({ algorithm })), [
    dispatch,
  ]);

  const actions = useMemo(() => getActions(handleDeleteAlgorithm), [handleDeleteAlgorithm]);
  const preparedAlgorithms = useMemo(() => prepareAlgorithms(algorithms), [algorithms]);

  return (
    <Table
      columns={columns}
      data={preparedAlgorithms}
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
        <Table.Toolbar title="Алгоритмы" count={totalCount}>
          <Button color={colors.success} startIcon={iconTypes.plus} onClick={handleCreateAlgorithm}>
            Новый алгоритм
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

export default AlgorithmList;
