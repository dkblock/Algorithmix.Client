import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadTestQuestionImage } from "../../../../store/actions/test-question";
import CreateModal from "../../../_common/modal/create-modal";
import FileDropzone, { fileTypes } from "../../../_common/file-dropzone";

const UploadTestQuestionImageModal = () => {
  const dispatch = useDispatch();
  const { testId, questionId } = useSelector((state) => state.modal.modalProps);
  const { isQuestionImageUpdating } = useSelector((state) => state.testDesign);
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
    <CreateModal
      title="Загрузка изображения"
      createButtonText="Загрузить"
      isCreating={isQuestionImageUpdating}
      onCreate={handleQuestionImageUpload}
    >
      <FileDropzone acceptedFileTypes={[fileTypes.image]} onDrop={handleQuestionImageDrop} />
    </CreateModal>
  );
};

export default UploadTestQuestionImageModal;
