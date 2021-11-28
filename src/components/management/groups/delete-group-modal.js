import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroup } from "../../../store/actions/group";
import { hideModal } from "../../../store/actions/modal";
import { DeleteModal, InfoModal } from "../../_common/modal";

const DeleteGroupModal = () => {
  const dispatch = useDispatch();
  const { group } = useSelector((state) => state.modal.modalProps);
  const { isSaving } = useSelector((state) => state.group);

  const requiredGroups = ["Не назначена", "Администраторы", "Модераторы"];
  const isRequired = requiredGroups.includes(group.name);

  const handleGroupDelete = () => dispatch(deleteGroup({ groupId: group.id }));
  const handleSubmit = () => dispatch(hideModal());

  return isRequired ? (
    <InfoModal title={group.name} infoText="Вы не можете удалить данную группу!" onSubmit={handleSubmit} />
  ) : (
    <DeleteModal
      title={group.name}
      deleteText="Вы действительно хотите удалить данную группу? Все пользователи, состоящие в ней, будут переведены в группу 'Не назначена'"
      isDeleting={isSaving}
      onDelete={handleGroupDelete}
    />
  );
};

export default DeleteGroupModal;
