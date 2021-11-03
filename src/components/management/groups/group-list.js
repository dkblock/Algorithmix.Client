import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTitle } from "../../../hooks";
import { fetchGroups, showCreateGroupModal, showDeleteGroupModal, updateGroup } from "../../../store/actions/group";
import Table from "../../_common/table";
import { iconTypes } from "../../_common/icon";
import Button, { colors } from "../../_common/button";
import IsAvailableForRegisterCell from "./is-available-for-register-cell";

const getActions = (onGroupDelete) => [
  {
    label: "Удалить",
    icon: iconTypes.delete,
    onClick: (group) => onGroupDelete(group),
  },
];

const getColumns = (onGroupUpdate) => [
  { id: "id", label: "Id" },
  { id: "name", label: "Группа" },
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
  const { groups, isFetching } = useSelector((state) => state.group);

  useTitle("Группы", "Группы");

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const handleGroupDelete = useCallback(
    (group) => {
      dispatch(showDeleteGroupModal({ group }));
    },
    [dispatch]
  );

  const handleGroupUpdate = useCallback(
    (group) => {
      dispatch(updateGroup({ groupId: group.id, group }));
    },
    [dispatch]
  );

  const handleGroupCreate = useCallback(() => dispatch(showCreateGroupModal()), [dispatch]);

  const actions = useMemo(() => getActions(handleGroupDelete), [handleGroupDelete]);
  const columns = useMemo(() => getColumns(handleGroupUpdate), [handleGroupUpdate]);

  return (
    <Table
      toolbar={
        <Table.Toolbar title="Группы" count={groups.length}>
          <Button color={colors.success} startIcon={iconTypes.plus} onClick={handleGroupCreate}>
            Новая группа
          </Button>
        </Table.Toolbar>
      }
      columns={columns}
      data={groups}
      actions={actions}
      isFetching={isFetching}
      sortBy="id"
      sortDirection="asc"
    />
  );
};

export default GroupList;
