import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { publishTest } from "../../../store/actions/test";
import { CreateModal, modalSizes } from "../../_common/modal";
import Checkbox from "../../_common/checkbox";
import palette from "../../../utils/palette";

const PublishTestModal = () => {
  const dispatch = useDispatch();
  const { test } = useSelector((state) => state.modal.modalProps);
  const { publishErrors, isPublishing } = useSelector((state) => state.testDesign);

  const [clearTestResults, setClearTestResults] = useState(false);

  const handlePublish = useCallback(() => {
    if (!isPublishing) {
      dispatch(publishTest({ testId: test.id, clearTestResults }));
    }
  }, [dispatch, test.id, clearTestResults]);

  const handleDeleteTestResults = useCallback(() => setClearTestResults((prevState) => !prevState), [
    setClearTestResults,
  ]);

  return (
    <CreateModal
      title={test.name}
      size={modalSizes.medium}
      createButtonText="Опубликовать"
      isCreating={isPublishing}
      onCreate={handlePublish}
      actions={
        test.hasPasses ? (
          <Checkbox label="Удалить результаты теста" value={clearTestResults} onChange={handleDeleteTestResults} />
        ) : null
      }
    >
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
      ) : clearTestResults ? (
        "Вы действительно хотите опубликовать изменения для данного теста? Все результаты прохождения теста будут удалены!"
      ) : (
        "Вы действительно хотите опубликовать изменения для данного теста?"
      )}
    </CreateModal>
  );
};

export default PublishTestModal;
