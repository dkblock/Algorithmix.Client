import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { clearTestQuestionImage, showUploadTestQuestionImageModal } from "../../../../../store/actions/test-question";
import { getImageSrc } from "../../../../../utils/get-image-src";
import Button, { colors } from "../../../../_common/Button";
import { iconTypes } from "../../../../_common/Icon";
import ZoomImage from "../../../../_common/ZoomImage";

const TestQuestionImage = ({ question }) => {
  const dispatch = useDispatch();

  const handleQuestionImageUpload = useCallback(() => {
    dispatch(showUploadTestQuestionImageModal({ testId: question.test.id, questionId: question.id }));
  }, [dispatch, question.id, question.test.id]);

  const handleQuestionImageClear = useCallback(() => {
    dispatch(clearTestQuestionImage({ testId: question.test.id, questionId: question.id }));
  }, [dispatch, question.id, question.test.id]);

  return (
    <section className="test-question-info__section test-question-info__section--right">
      {question.image ? (
        <>
          <ZoomImage className="test-question-info__image" src={getImageSrc(question.image)} alt="question image"/>
          <Button color={colors.danger} endIcon={iconTypes.delete} onClick={handleQuestionImageClear}>
            Удалить изображение
          </Button>
        </>
      ) : (
        <Button color={colors.success} endIcon={iconTypes.upload} onClick={handleQuestionImageUpload}>
          Загрузить изображение
        </Button>
      )}
    </section>
  );
};

export default TestQuestionImage;
