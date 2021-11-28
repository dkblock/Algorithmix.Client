import React from "react";
import { useSelector } from "react-redux";
import Button, { buttonTypes } from "../../_common/button";
import { iconTypes } from "../../_common/icon";

const TestPassNavigation = ({ onNextQuestionClick, onPreviousQuestionClick }) => {
  const { currentQuestion, isFetching, isHandlingResult } = useSelector((state) => state.testPass);

  return (
    <div className="test-pass-navigation">
      <div>
        {currentQuestion.previousQuestionId && (
          <Button
            type={buttonTypes.outlined}
            startIcon={iconTypes.arrowLeft}
            isLoading={isFetching}
            loadingPosition="start"
            disabled={isFetching || isHandlingResult}
            onClick={onPreviousQuestionClick}
          >
            Предыдущий вопрос
          </Button>
        )}
      </div>
      <div>
        <Button
          endIcon={iconTypes.arrowRight}
          isLoading={isHandlingResult}
          disabled={isFetching || isHandlingResult}
          onClick={onNextQuestionClick}
        >
          {currentQuestion.nextQuestionId ? "Следующий вопрос" : "Завершить тест"}
        </Button>
      </div>
    </div>
  );
};

export default TestPassNavigation;
