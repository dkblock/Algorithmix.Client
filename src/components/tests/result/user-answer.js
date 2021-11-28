import React from "react";
import { getFileSrc } from "../../../utils/get-file-src";
import testQuestionTypes from "../../../constants/test-question-types";
import ZoomImage from "../../_common/zoom-image";
import TestResultAnswerList from "./test-result-answer-list";

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
        <div className="test-result-user-answer__question">
          <span>Вопрос:</span> {question.value}
        </div>
        <hr className="w-100"/>
        <div className="test-result-user-answer__answer-list-container">
          <TestResultAnswerList
            answers={question.answers}
            userAnswers={userAnswer.answers}
            questionType={question.type}
            label={own ? "Ваш ответ" : "Ответ"}
          />
          {!own && (
            <TestResultAnswerList
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
