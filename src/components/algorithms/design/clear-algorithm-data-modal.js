import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAlgorithmConstructor, clearAlgorithmDescription } from "../../../store/actions/algorithm";
import algorithmDataTypes from "../../../constants/algorithm-data-types";
import { DeleteModal } from "../../_common/modal";
import Checkbox from "../../_common/checkbox";

const ClearAlgorithmDataModal = () => {
  const dispatch = useDispatch();
  const { algorithmId, algorithmDataType } = useSelector((state) => state.modal.modalProps);
  const { isSaving } = useSelector((state) => state.algorithmDesign);

  const [downloadBeforeDelete, setDownloadBeforeDelete] = useState(false);

  const deleteTexts = {
    [algorithmDataTypes.constructor]: "Вы действительно хотите удалить Конструктор данного алгоритма?",
    [algorithmDataTypes.description]: "Вы действительно хотите удалить описание данного алгоритма?",
  };

  const onAlgorithmDataClear = {
    [algorithmDataTypes.constructor]: () => dispatch(clearAlgorithmConstructor({ algorithmId, downloadBeforeDelete })),
    [algorithmDataTypes.description]: () => dispatch(clearAlgorithmDescription({ algorithmId, downloadBeforeDelete })),
  };

  const handleAlgorithmDataClear = () => onAlgorithmDataClear[algorithmDataType]();
  const handleDownloadBeforeDelete = () => setDownloadBeforeDelete((prevState) => !prevState);

  return (
    <DeleteModal
      title="Удаление файла"
      deleteText={deleteTexts[algorithmDataType]}
      isDeleting={isSaving}
      onDelete={handleAlgorithmDataClear}
      actions={
        <Checkbox label="Скачать текущую версию" value={downloadBeforeDelete} onChange={handleDownloadBeforeDelete} />
      }
    />
  );
};

export default ClearAlgorithmDataModal;
