import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadAlgorithmConstructor, uploadAlgorithmDescription } from "../../../store/actions/algorithm";
import algorithmDataTypes from "../../../constants/algorithm-data-types";
import { CreateModal } from "../../_common/modal";
import FileDropzone, { fileTypes } from "../../_common/file-dropzone";
import palette from "../../../utils/palette";

const UploadAlgorithmDataModal = () => {
  const dispatch = useDispatch();
  const { algorithmId, algorithmDataType } = useSelector((state) => state.modal.modalProps);
  const { isSaving, validationErrors: serverValidationErrors } = useSelector((state) => state.algorithmDesign);

  const [file, setFile] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    setValidationErrors(serverValidationErrors);
  }, [serverValidationErrors]);

  const onAlgorithmDataUpload = {
    [algorithmDataTypes.constructor]: () => dispatch(uploadAlgorithmConstructor({ algorithmId, constructor: file })),
    [algorithmDataTypes.description]: () => dispatch(uploadAlgorithmDescription({ algorithmId, description: file })),
  };

  const handleAlgorithmFileDrop = (files) => {
    if (files.length > 0) setFile(files[0]);
    else setFile(null);

    setValidationErrors({});
  };

  const handleAlgorithmFileUpload = () => {
    if (file) {
      onAlgorithmDataUpload[algorithmDataType]();
    }
  };

  return (
    <CreateModal
      title="Загрузка файла"
      createButtonText="Загрузить"
      isCreating={isSaving}
      onCreate={handleAlgorithmFileUpload}
    >
      <FileDropzone acceptedFileTypes={[fileTypes.archive]} onDrop={handleAlgorithmFileDrop} />
      {Object.keys(validationErrors).length > 0 &&
        Object.keys(validationErrors).map((key) => (
          <div key={key} style={{ color: palette.danger.main }}>
            Ошибка: {validationErrors[key]}
          </div>
        ))}
    </CreateModal>
  );
};

export default UploadAlgorithmDataModal;
