import FreeTestAnswerList from "./free-test-answer-list";
import MultiTestAnswerList from "./multi-test-answer-list";
import SingleTestAnswerList from "./single-test-answer-list";
import testQuestionTypes from "../../../../../constants/test-question-types";

const testAnswerListTypes = {
  [testQuestionTypes.freeAnswerQuestion]: FreeTestAnswerList,
  [testQuestionTypes.multiAnswerQuestion]: MultiTestAnswerList,
  [testQuestionTypes.singleAnswerQuestion]: SingleTestAnswerList,
};

export default testAnswerListTypes;
