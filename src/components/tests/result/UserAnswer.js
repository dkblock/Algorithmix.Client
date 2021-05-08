import React from "react";
import { getImageSrc } from "../../../utils/get-image-src";
import ZoomImage from "../../_common/ZoomImage";
import TestAnswerList from "./TestAnswerList";
import { Icon, iconTypes } from "../../_common/Icon";
import colors from "../../../constants/colors";
import Tooltip from "../../_common/Tooltip";

const UserAnswer = ({ userAnswer, questionOrder }) => {
  const { question, isCorrect } = userAnswer;

  return (
    <div className="test-result-user-answer">
      <div className="test-result-user-answer__info">
        <div className="test-result-user-answer__title">
          Вопрос {questionOrder}
          <Tooltip title={isCorrect ? "Верно" : "Неверно"} placement="right">
            <Icon
              type={isCorrect ? iconTypes.done : iconTypes.clear}
              color={isCorrect ? colors.success : colors.danger}
            />
          </Tooltip>
        </div>
        <div>{question.value}</div>
        <TestAnswerList
          answers={question.answers}
          userAnswers={userAnswer.answers}
          questionType={question.type}
          label={"Ваш ответ"}
        />
      </div>
      <div className="test-result-user-answer__image-container">
        {question.image && <ZoomImage className="test-result-user-answer__image" src={getImageSrc(question.image)} />}
      </div>
    </div>
  );
};

export default UserAnswer;
