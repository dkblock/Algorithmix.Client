import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadTestQuestionImage } from "../../../../../store/actions/test-question";
import CreateModal from "../../../../_common/Modal/CreateModal";
import FileDropzone, { fileTypes } from "../../../../_common/FileDropzone";

const UploadTestQuestionImageModal = () => {
  const dispatch = useDispatch();
  const { testId, questionId } = useSelector((state) => state.modal.modalProps);
  const [image, setImage] = useState(null);

  const handleQuestionImageDrop = useCallback((images) => {
    if (images.length > 0) setImage(images[0]);
    else setImage(null);
  }, []);

  const handleQuestionImageUpload = useCallback(() => {
    if (image) {
      dispatch(uploadTestQuestionImage({ testId, questionId, image }));
    }
  }, [dispatch, image, questionId, testId]);

  return (
    <CreateModal title="Загрузка изображения" createButtonText="Загрузить" onCreate={handleQuestionImageUpload}>
      <FileDropzone acceptedFileTypes={[fileTypes.image]} onDrop={handleQuestionImageDrop} />
    </CreateModal>
  );
};

export default UploadTestQuestionImageModal;
