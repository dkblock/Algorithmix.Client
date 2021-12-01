import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { useAdminRole, useTitle } from "../../../hooks";
import { fetchUsers, showDeleteUserModal, updateUser } from "../../../store/actions/user";
import Table from "../../_common/table";
import { iconTypes } from "../../_common/icon";
import TextField from "../../_common/text-field";
import { Dropdown } from "../../_common/dropdown";
import AvatarCell from "./cells/avatar-cell";
import GroupCell from "./cells/group-cell";
import RoleCell from "./cells/role-cell";

const getActions = (isAdmin, onUserDelete) => () => [
  {
    label: "Удалить",
    icon: iconTypes.delete,
    disabled: !isAdmin,
    onClick: (user) => onUserDelete(user),
  },
];

const getColumns = (onUserUpdate) => [
  { id: "avatar", label: " ", width: 64, renderCell: (row) => <AvatarCell row={row} /> },
  { id: "fullName", label: "Имя" },
  { id: "email", label: "Email" },
  {
    id: "groupId",
    label: "Группа",
    renderCell: (row) => <GroupCell row={row} onUserUpdate={onUserUpdate} />,
  },
  { id: "role", label: "Роль", renderCell: (row) => <RoleCell row={row} onUserUpdate={onUserUpdate} /> },
];

const prepareUsers = (users) =>
  users.map((user) => ({
    id: user.id,
    fullName: `${user.lastName} ${user.firstName}`,
    firstName: user.firstName,
    lastname: user.lastName,
    email: user.email,
    groupId: user.group.id,
    role: user.role,
  }));

const UserList = () => {
  const dispatch = useDispatch();
  const { groups, isFetching: isGroupsFetching } = useSelector((state) => state.group);
  const {
    users,
    totalCount,
    isFetching: isUsersFetching,
    searchText: search,
    pageIndex,
    pageSize,
    sortBy,
    sortDirection,
  } = useSelector((state) => state.user);
  const isAdmin = useAdminRole();

  const [searchText, setSearchText] = useState(search);
  const [groupId, setGroupId] = useState(-1);
  const [role, setRole] = useState("all");

  useTitle("Пользователи", "Пользователи");

  useEffect(() => {
    dispatch(fetchUsers({ searchText, groupId, role, pageIndex, pageSize, sortBy, sortDirection }));
  }, [dispatch]);

  const handleSearch = useCallback(
    (params) => {
      dispatch(fetchUsers({ searchText, pageIndex, pageSize, sortBy, sortDirection, ...params }));
    },
    [searchText, groupId, role, pageIndex, pageSize, sortBy, sortDirection]
  );

  const handleSearchDebounced = useDebouncedCallback(({ searchText }) => {
    handleSearch({ searchText });
  }, 500);

  const handleSearchTextChange = useCallback(
    (value) => {
      setSearchText(value);
      handleSearchDebounced({ searchText: value });
    },
    [groupId, role]
  );

  const handleGroupIdChange = useCallback(
    (value) => {
      setGroupId(value);
      handleSearch({ groupId: value });
    },
    [searchText, role]
  );

  const handleRoleChange = useCallback(
    (value) => {
      setRole(value);
      handleSearch({ role: value });
    },
    [searchText, groupId]
  );

  const handleSort = useCallback(
    ({ sortBy: orderBy, sortDirection: sortOrder }) => {
      handleSearch({ sortBy: orderBy, sortDirection: sortOrder });
    },
    [searchText, groupId, role]
  );

  const handlePageChange = useCallback(
    (newPageIndex) => {
      handleSearch({ pageIndex: newPageIndex });
    },
    [searchText, groupId, role]
  );

  const handleUserDelete = useCallback((user) => dispatch(showDeleteUserModal({ user })), [dispatch]);
  const handleUserUpdate = useCallback((userId, updatedUser) => dispatch(updateUser({ userId, user: updatedUser })), [
    dispatch,
  ]);

  const actions = useMemo(() => getActions(isAdmin, handleUserDelete), [isAdmin, handleUserDelete]);
  const columns = useMemo(() => getColumns(handleUserUpdate), [handleUserUpdate]);
  const preparedUsers = useMemo(() => prepareUsers(users), [users]);
  const groupItems = [{ value: -1, label: "Все" }, ...groups.map((group) => ({ value: group.id, label: group.name }))];
  const roleItems = [
    { value: "all", label: "Все" },
    { value: "admin", label: "Администратор" },
    { value: "moderator", label: "Модератор" },
    { value: "user", label: "Пользователь" },
  ];

  return (
    <Table
      columns={columns}
      data={preparedUsers}
      actions={actions}
      isFetching={isUsersFetching || isGroupsFetching}
      totalCount={totalCount}
      pageIndex={pageIndex}
      pageSize={pageSize}
      sortBy={sortBy}
      sortDirection={sortDirection}
      onSort={handleSort}
      onPageChange={handlePageChange}
      toolbar={
        <Table.Toolbar title="Пользователи" count={totalCount}>
          <Dropdown
            className="management-table__toolbar-item"
            label="Группа"
            items={groupItems}
            value={groupId}
            onChange={handleGroupIdChange}
          />
          <Dropdown
            className="management-table__toolbar-item"
            label="Роль"
            items={roleItems}
            value={role}
            onChange={handleRoleChange}
          />
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

export default UserList;
