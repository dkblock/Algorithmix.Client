import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { publishTest } from "../../../store/actions/test";
import { CreateModal, modalSizes } from "../../_common/Modal";
import palette from "../../../utils/palette";

const PublishTestModal = () => {
  const dispatch = useDispatch();
  const { test } = useSelector((state) => state.modal.modalProps);
  const { publishErrors } = useSelector((state) => state.testDesign);

  const handlePublish = useCallback(() => {
    dispatch(publishTest({ testId: test.id }));
  }, [dispatch, test.id]);

  return (
    <CreateModal title={test.name} size={modalSizes.small} createButtonText="Опубликовать" onCreate={handlePublish}>
      {publishErrors.length > 0 ? (
        <>
          <p style={{ color: palette.danger.light, fontWeight: 600 }}>
            Тест не был опубликован из-за следующих ошибок:
          </p>
          {publishErrors.map((error, index) => (
            <div key={index}>
              {index + 1}) {error.message}
            </div>
          ))}
        </>
      ) : (
        "Вы действительно хотите опубликовать данный тест? Все результаты прохождения теста будут удалены!"
      )}
    </CreateModal>
  );
};

export default PublishTestModal;
