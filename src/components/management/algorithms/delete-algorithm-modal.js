import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAlgorithm } from "../../../store/actions/algorithm";
import { DeleteModal } from "../../_common/modal";

const DeleteAlgorithmModal = () => {
  const dispatch = useDispatch();
  const { algorithm } = useSelector((state) => state.modal.modalProps);
  const { isSaving } = useSelector((state) => state.algorithm);

  const handleDeleteAlgorithm = () => dispatch(deleteAlgorithm({ algorithmId: algorithm.id }));

  return (
    <DeleteModal
      title={algorithm.name}
      deleteText="Вы действительно хотите удалить данный алгоритм? Все связанные данные также будут удалены!"
      isDeleting={isSaving}
      onDelete={handleDeleteAlgorithm}
    />
  );
};

export default DeleteAlgorithmModal;
