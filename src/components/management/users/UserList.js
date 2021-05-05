import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTitle } from "../../../hooks";
import { fetchUsers, showDeleteUserModal, updateUser } from "../../../store/actions/user";
import { fetchGroups } from "../../../store/actions/group";
import Table, { TableToolbar } from "../../_common/Table";
import { iconTypes } from "../../_common/Icon";
import AvatarCell from "./AvatarCell";
import GroupCell from "./GroupCell";
import RoleCell from "./RoleCell";

const getActions = (onUserDelete) => [
  {
    label: "Удалить",
    icon: iconTypes.delete,
    onClick: (user) => onUserDelete(user),
  },
];

const getColumns = (onUserUpdate) => [
  { field: "avatar", headerName: " ", width: 64, renderCell: ({ row }) => <AvatarCell row={row} /> },
  { field: "fullName", headerName: "Имя" },
  { field: "email", headerName: "Email" },
  {
    field: "groupId",
    headerName: "Группа",
    renderCell: ({ row }) => <GroupCell row={row} onUserUpdate={onUserUpdate} />,
  },
  { field: "role", headerName: "Роль", renderCell: ({ row }) => <RoleCell row={row} onUserUpdate={onUserUpdate} /> },
];

const prepareUsers = (users) =>
  users.map((user) => ({
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`,
    email: user.email,
    groupId: user.group.id,
    role: user.role,
  }));

const UserList = () => {
  const dispatch = useDispatch();
  const { users, isUsersFetching } = useSelector((state) => state.user);
  const { isGroupsFetching } = useSelector((state) => state.group);

  useTitle("Пользователи", "Пользователи");

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchGroups());
  }, [dispatch]);

  const handleUserDelete = useCallback(
    (user) => {
      dispatch(showDeleteUserModal({ user }));
    },
    [dispatch]
  );

  const handleUserUpdate = useCallback(
    (userId, updatedUser) => {
      dispatch(updateUser({ userId, user: updatedUser }));
    },
    [dispatch]
  );

  const actions = useMemo(() => getActions(handleUserDelete), [handleUserDelete]);
  const columns = useMemo(() => getColumns(handleUserUpdate), [handleUserUpdate]);
  const preparedUsers = useMemo(() => prepareUsers(users), [users]);

  return (
    <Table
      toolbar={<TableToolbar title="Пользователи" count={users.length} />}
      columns={columns}
      data={preparedUsers}
      actions={actions}
      isFetching={isUsersFetching || isGroupsFetching}
      sortBy="groupId"
      sortDirection="asc"
    />
  );
};

export default UserList;
