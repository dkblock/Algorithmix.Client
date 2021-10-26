import React from "react";
import { getFileSrc } from "../../../utils/get-file-src";
import testQuestionTypes from "../../../constants/test-question-types";
import ZoomImage from "../../_common/zoom-image";
import ProgressBar from "../../_common/progress-bar";
import colors from "../../../constants/colors";

const getCorrectAnswers = (answers, questionType) => {
  if (questionType === testQuestionTypes.freeAnswerQuestion) return [answers[0].value];
  return answers.filter((answer) => answer.isCorrect).map((answer) => answer.id.toString());
};

const prepareUserAnswersRatio = (userAnswersRatio, answers, questionType) => {
  const getAnswer = (answerId) => ({
    [testQuestionTypes.freeAnswerQuestion]: () => answerId,
    [testQuestionTypes.singleAnswerQuestion]: () => answers.find((a) => a.id === parseInt(answerId)).value,
    [testQuestionTypes.multiAnswerQuestion]: () => answers.find((a) => a.id === parseInt(answerId)).value,
  });

  return Object.keys(userAnswersRatio)
    .sort((a, b) => answers.findIndex((x) => x.id === parseInt(a)) - answers.findIndex((x) => x.id === parseInt(b)))
    .map((answerId) => ({
      answerId,
      value: userAnswersRatio[answerId],
      label: getAnswer(answerId)[questionType](),
    }));
};

const TestQuestionStats = ({ questionStats }) => {
  const { question, userAnswersRatio } = questionStats;

  const correctAnswers = getCorrectAnswers(question.answers, question.type);
  const preparedUserAnswerRatio = prepareUserAnswersRatio(userAnswersRatio, question.answers, question.type);

  return (
    <div className="test-question-stats">
      <div className="test-question-stats__info-container">
        <div className="test-question-stats__question">
          <span>Вопрос:</span> {question.value}
        </div>
        <hr className="w-100"/>
        <div className="test-question-stats__stats">
          <span>Статистика ответов:</span>
          {preparedUserAnswerRatio.map((uar) => (
            <ProgressBar
              key={uar.label}
              value={uar.value}
              maxValue={questionStats.passesCount}
              label={uar.label}
              color={correctAnswers.includes(uar.answerId) ? colors.success : colors.danger}
            />
          ))}
        </div>
      </div>
      <div className="test-question-stats__image-container">
        {question.image && <ZoomImage className="test-question-stats__image" src={getFileSrc(question.image)} />}
      </div>
    </div>
  );
};

export default TestQuestionStats;
