import FreeTestResultAnswerList from "./free-test-result-answer-list";
import MultiTestResultAnswerList from "./multi-test-result-answer-list";
import SingleTestResultAnswerList from "./single-test-result-answer-list";
import testQuestionTypes from "../../../../constants/test-question-types";

const testAnswerListTypes = {
  [testQuestionTypes.freeAnswerQuestion]: FreeTestResultAnswerList,
  [testQuestionTypes.multiAnswerQuestion]: MultiTestResultAnswerList,
  [testQuestionTypes.singleAnswerQuestion]: SingleTestResultAnswerList,
};

export default testAnswerListTypes;
