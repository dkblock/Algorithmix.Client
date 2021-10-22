import React from "react";
import { getFileSrc } from "../../../utils/get-file-src";
import testQuestionTypes from "../../../constants/test-question-types";
import ZoomImage from "../../_common/zoom-image";
import TestAnswerList from "./test-answer-list";

const getCorrectAnswers = (answers, questionType) => {
  if (questionType === testQuestionTypes.freeAnswerQuestion) return [answers[0].value];
  return answers.filter((answer) => answer.isCorrect).map((answer) => answer.id.toString());
};

const UserAnswer = ({ userAnswer, own }) => {
  const { question } = userAnswer;
  const correctAnswers = getCorrectAnswers(question.answers, question.type);

  return (
    <div className="test-result-user-answer">
      <div className="test-result-user-answer__info">
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
        {question.image && <ZoomImage className="test-result-user-answer__image" src={getFileSrc(question.image)} />}
      </div>
    </div>
  );
};

export default UserAnswer;
