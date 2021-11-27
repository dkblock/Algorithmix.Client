import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteModal } from "../../_common/modal";
import { deleteTestQuestion } from "../../../store/actions/test-question";

const DeleteTestQuestionModal = () => {
  const dispatch = useDispatch();
  const { testId, questionId } = useSelector((state) => state.modal.modalProps);
  const { isQuestionDeleting } = useSelector((state) => state.testDesign);

  const handleQuestionDelete = () => dispatch(deleteTestQuestion({ testId: testId, questionId: questionId }));

  return (
    <DeleteModal
      title="Удаление вопроса"
      deleteText="Вы действительно хотите удалить данный вопрос? Все связанные данные также будут удалены!"
      isDeleting={isQuestionDeleting}
      onDelete={handleQuestionDelete}
    />
  );
};

export default DeleteTestQuestionModal;
