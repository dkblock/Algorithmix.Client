import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../../store/actions/user";
import { hideModal } from "../../../store/actions/modal";
import { DeleteModal, InfoModal } from "../../_common/modal";
import { useCurrentUser } from "../../../hooks";

const DeleteUserModal = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.modal.modalProps);
  const { isSaving } = useSelector((state) => state.user);
  const { currentUser } = useCurrentUser();
  const isDeleteAvailable = user.id !== currentUser.id;

  const handleUserDelete = () => dispatch(deleteUser({ userId: user.id }));
  const handleSubmit = () => dispatch(hideModal());

  return isDeleteAvailable ? (
    <DeleteModal
      title={user.fullName}
      deleteText="Вы действительно хотите удалить данного пользователя? Все связанные данные также будут удалены!"
      isDeleting={isSaving}
      onDelete={handleUserDelete}
    />
  ) : (
    <InfoModal title={user.fullName} infoText="Вы не можете удалить свой аккаунт!" onSubmit={handleSubmit} />
  );
};

export default DeleteUserModal;
