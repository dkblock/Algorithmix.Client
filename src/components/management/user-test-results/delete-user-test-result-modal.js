import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserTestResult } from "../../../store/actions/user-test-result";
import { DeleteModal } from "../../_common/modal";

const DeleteUserTestResultModal = () => {
  const dispatch = useDispatch();
  const { testResult } = useSelector((state) => state.modal.modalProps);
  const { isSaving } = useSelector((state) => state.userTestResult);

  const handleTestResultDelete = () =>
    dispatch(
      deleteUserTestResult({
        testId: testResult.testId,
        userId: testResult.userId,
      })
    );

  return (
    <DeleteModal
      title={testResult.testName}
      deleteText="Вы действительно хотите удалить данный результат? Весь прогресс прохождения будет утерян, и пользователь сможет пройти тест заново."
      isDeleting={isSaving}
      onDelete={handleTestResultDelete}
    />
  );
};

export default DeleteUserTestResultModal;
