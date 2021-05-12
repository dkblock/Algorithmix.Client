import React from "react";
import { getImageSrc } from "../../../utils/get-image-src";
import colors from "../../../constants/colors";
import testQuestionTypes from "../../../constants/test-question-types";
import ZoomImage from "../../_common/ZoomImage";
import { Icon, iconTypes } from "../../_common/Icon";
import Tooltip from "../../_common/Tooltip";
import TestAnswerList from "./TestAnswerList";

const getCorrectAnswers = (answers, questionType) => {
  if (questionType === testQuestionTypes.freeAnswerQuestion) return [answers[0].value];
  return answers.filter((answer) => answer.isCorrect).map((answer) => answer.id.toString());
};

const UserAnswer = ({ userAnswer, questionOrder, own }) => {
  const { question, isCorrect } = userAnswer;
  const correctAnswers = getCorrectAnswers(question.answers, question.type);

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
        <div className="test-result-user-answer__answer-list-container">
          <TestAnswerList
            answers={question.answers}
            userAnswers={userAnswer.answers}
            questionType={question.type}
            label={own ? "Ваш ответ" : "Ответ"}
          />
          {!own && (
            <TestAnswerList
              answers={question.answers}
              userAnswers={correctAnswers}
              questionType={question.type}
              label={"Правильный ответ"}
            />
          )}
        </div>
      </div>
      <div className="test-result-user-answer__image-container">
        {question.image && <ZoomImage className="test-result-user-answer__image" src={getImageSrc(question.image)} />}
      </div>
    </div>
  );
};

export default UserAnswer;
