import React from "react";
import { getFileSrc } from "../../../utils/get-file-src";
import testQuestionTypes from "../../../constants/test-question-types";
import ZoomImage from "../../_common/ZoomImage";
import TestAnswerList from "../result/TestAnswerList";

const getCorrectAnswers = (answers, questionType) => {
  if (questionType === testQuestionTypes.freeAnswerQuestion) return [answers[0].value];
  return answers.filter((answer) => answer.isCorrect).map((answer) => answer.id.toString());
};

const TestQuestionStats = ({ question, questionOrder }) => {
  const correctAnswers = getCorrectAnswers(question.answers, question.type);

  return (
    <div className="test-question-stats">
      <div className="test-question-stats__info">
        <div className="test-question-stats__title">Вопрос {questionOrder}</div>
        <div>{question.value}</div>
        <div className="test-question-stats__answer-list-container">
          <TestAnswerList
            answers={question.answers}
            userAnswers={correctAnswers}
            questionType={question.type}
            label={"Правильный ответ"}
          />
          <div className="test-question-stats__stats">
            <div>
              <span>Всего ответов:</span> {question.passesCount}
            </div>
            <div>
              <span>Правильных ответов:</span> {question.correctAnswersCount}
            </div>
            <div>
              <span>Неправильных ответов:</span> {question.passesCount - question.correctAnswersCount}
            </div>
            <div>
              <span>Средний результат:</span> {question.averageResult}%
            </div>
          </div>
        </div>
      </div>
      <div className="test-question-stats__image-container">
        {question.image && <ZoomImage className="test-question-stats__image" src={getFileSrc(question.image)} />}
      </div>
    </div>
  );
};

export default TestQuestionStats;
