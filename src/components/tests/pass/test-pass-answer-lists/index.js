import FreeTestPassAnswerList from "./free-test-pass-answer-list";
import MultiTestPassAnswerList from "./multi-test-pass-answer-list";
import SingleTestPassAnswerList from "./single-test-pass-answer-list";
import testQuestionTypes from "../../../../constants/test-question-types";

const testAnswerListTypes = {
  [testQuestionTypes.freeAnswerQuestion]: FreeTestPassAnswerList,
  [testQuestionTypes.multiAnswerQuestion]: MultiTestPassAnswerList,
  [testQuestionTypes.singleAnswerQuestion]: SingleTestPassAnswerList,
};

export default testAnswerListTypes;
