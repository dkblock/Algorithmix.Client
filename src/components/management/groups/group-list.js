import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { useAdminRole, useTitle } from "../../../hooks";
import { fetchGroups, showCreateGroupModal, showDeleteGroupModal, updateGroup } from "../../../store/actions/group";
import Table from "../../_common/table";
import { iconTypes } from "../../_common/icon";
import Button, { colors } from "../../_common/button";
import TextField from "../../_common/text-field";
import IsAvailableForRegisterCell from "./is-available-for-register-cell";

const getActions = (isAdmin, onGroupDelete) => () => [
  { label: "Удалить", icon: iconTypes.delete, disabled: !isAdmin, onClick: (group) => onGroupDelete(group) },
];

const getColumns = (onGroupUpdate) => [
  { id: "id", label: "ID" },
  { id: "name", label: "Название" },
  { id: "usersCount", label: "Количество пользователей", align: "center" },
  {
    id: "isAvailableForRegister",
    label: "Доступна для регистрации",
    align: "center",
    renderCell: (row) => <IsAvailableForRegisterCell row={row} onGroupUpdate={onGroupUpdate} />,
  },
];

const GroupList = () => {
  const dispatch = useDispatch();
  const {
    groups,
    totalCount,
    isFetching,
    searchText: search,
    pageIndex,
    pageSize,
    sortBy,
    sortDirection,
  } = useSelector((state) => state.group);

  const isAdmin = useAdminRole();
  const [searchText, setSearchText] = useState(search);

  useTitle("Группы", "Группы");

  useEffect(() => {
    dispatch(fetchGroups({ searchText, pageIndex, pageSize, sortBy, sortDirection }));
  }, [dispatch]);

  const handleSearch = useCallback(
    (params) => {
      dispatch(fetchGroups({ searchText, pageIndex, pageSize, sortBy, sortDirection, ...params }));
    },
    [searchText, pageIndex, pageSize, sortBy, sortDirection]
  );

  const handleSearchDebounced = useDebouncedCallback(({ searchText }) => {
    handleSearch({ searchText });
  }, 500);

  const handleSearchTextChange = useCallback((value) => {
    setSearchText(value);
    handleSearchDebounced({ searchText: value });
  }, []);

  const handleSort = useCallback(
    ({ sortBy: orderBy, sortDirection: sortOrder }) => {
      handleSearch({ sortBy: orderBy, sortDirection: sortOrder });
    },
    [searchText]
  );

  const handlePageChange = useCallback(
    (newPageIndex) => {
      handleSearch({ pageIndex: newPageIndex });
    },
    [searchText]
  );

  const handleCreateGroup = useCallback(() => dispatch(showCreateGroupModal()), [dispatch]);
  const handleDeleteGroup = useCallback((group) => dispatch(showDeleteGroupModal({ group })), [dispatch]);
  const handleUpdateGroup = useCallback((group) => dispatch(updateGroup({ groupId: group.id, group })), [dispatch]);

  const actions = useMemo(() => getActions(isAdmin, handleDeleteGroup), [isAdmin, handleDeleteGroup]);
  const columns = useMemo(() => getColumns(handleUpdateGroup), [handleUpdateGroup]);

  return (
    <Table
      columns={columns}
      data={groups}
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
        <Table.Toolbar title="Группы" count={totalCount}>
          <Button color={colors.success} startIcon={iconTypes.plus} onClick={handleCreateGroup}>
            Новая группа
          </Button>
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

export default GroupList;
