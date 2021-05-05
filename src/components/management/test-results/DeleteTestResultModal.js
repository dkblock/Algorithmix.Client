import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTestResult } from "../../../store/actions/user-test-result";
import { DeleteModal } from "../../_common/Modal";

const DeleteTestResultModal = () => {
  const dispatch = useDispatch();
  const { testResult } = useSelector((state) => state.modal.modalProps);

  const handleTestResultDelete = () =>
    dispatch(
      deleteTestResult({
        testId: testResult.testId,
        userId: testResult.userId,
      })
    );

  return (
    <DeleteModal
      title={testResult.testName}
      deleteText="Вы действительно хотите удалить данный результат? Весь прогресс прохождения будет утерян, и пользователь сможет пройти тест заново."
      onDelete={handleTestResultDelete}
    />
  );
};

export default DeleteTestResultModal;
