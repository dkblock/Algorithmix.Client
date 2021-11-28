import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTest } from "../../../store/actions/test";
import { DeleteModal } from "../../_common/modal";

const DeleteTestModal = () => {
  const dispatch = useDispatch();
  const { test } = useSelector((state) => state.modal.modalProps);
  const { isSaving } = useSelector((state) => state.test);

  const handleTestDelete = () => dispatch(deleteTest({ testId: test.id }));

  return (
    <DeleteModal
      title={test.name}
      deleteText="Вы действительно хотите удалить данный тест? Все связанные данные также будут удалены!"
      isDeleting={isSaving}
      onDelete={handleTestDelete}
    />
  );
};

export default DeleteTestModal;
