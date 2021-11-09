import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAlgorithmConstructor, clearAlgorithmDescription } from "../../../store/actions/algorithm";
import algorithmDataTypes from "../../../constants/algorithm-data-types";
import { DeleteModal } from "../../_common/modal";

const ClearAlgorithmDataModal = () => {
  const dispatch = useDispatch();
  const { algorithmId, algorithmDataType } = useSelector((state) => state.modal.modalProps);

  const deleteTexts = {
    [algorithmDataTypes.constructor]: "Вы действительно хотите удалить Конструктор данного алгоритма?",
    [algorithmDataTypes.description]: "Вы действительно хотите удалить описание данного алгоритма?",
  };

  const onAlgorithmDataClear = {
    [algorithmDataTypes.constructor]: () => dispatch(clearAlgorithmConstructor({ algorithmId })),
    [algorithmDataTypes.description]: () => dispatch(clearAlgorithmDescription({ algorithmId })),
  };

  const handleAlgorithmDataClear = () => onAlgorithmDataClear[algorithmDataType]();

  return (
    <DeleteModal
      title="Удаление файла"
      deleteText={deleteTexts[algorithmDataType]}
      onDelete={handleAlgorithmDataClear}
    />
  );
};

export default ClearAlgorithmDataModal;
