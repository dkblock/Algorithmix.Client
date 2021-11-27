import { useSelector } from "react-redux";

const useTestSaving = () => {
  const {
    isTestUpdating,
    isQuestionCreating,
    isQuestionDeleting,
    isQuestionUpdating,
    isQuestionMoving,
    isAnswerCreating,
    isAnswerDeleting,
    isAnswerUpdating,
    isAnswerMoving,
    isPublishing,
  } = useSelector((state) => state.testDesign);

  return (
    isTestUpdating ||
    isQuestionCreating ||
    isQuestionDeleting ||
    isQuestionUpdating ||
    isQuestionMoving ||
    isAnswerCreating ||
    isAnswerDeleting ||
    isAnswerUpdating ||
    isAnswerMoving ||
    isPublishing
  );
};

export default useTestSaving;
