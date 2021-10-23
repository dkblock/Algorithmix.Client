import React from "react";
import { getFileSrc } from "../../../utils/get-file-src";
import testQuestionTypes from "../../../constants/test-question-types";
import ZoomImage from "../../_common/zoom-image";
import TestAnswerList from "../result/test-answer-list";
import ProgressBar from "../../_common/progress-bar";

const getCorrectAnswers = (answers, questionType) => {
  if (questionType === testQuestionTypes.freeAnswerQuestion) return [answers[0].value];
  return answers.filter((answer) => answer.isCorrect).map((answer) => answer.id.toString());
};

const TestQuestionStats = ({ questionStats }) => {
  const { question, userAnswersRatio } = questionStats;
  const correctAnswers = getCorrectAnswers(question.answers, question.type);

  return (
    <div className="test-question-stats">
      <div className="test-question-stats__info">
        <div>{question.value}</div>
        <div className="test-question-stats__answer-list-container">
          <TestAnswerList
            answers={question.answers}
            userAnswers={correctAnswers}
            questionType={question.type}
            label={"Правильный ответ"}
          />
          <div className="test-question-stats__stats">
            {Object.keys(userAnswersRatio).map((answerId) => (
              <ProgressBar value={userAnswersRatio[answerId] / questionStats.passesCount * 100} />
            ))}
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
