import FreeTestAnswerList from "./FreeTestAnswerList";
import MultiTestAnswerList from "./MultiTestAnswerList";
import SingleTestAnswerList from "./SingleTestAnswerList";
import testQuestionTypes from "../../../../constants/test-question-types";

const testAnswerListTypes = {
  [testQuestionTypes.freeAnswerQuestion]: FreeTestAnswerList,
  [testQuestionTypes.multiAnswerQuestion]: MultiTestAnswerList,
  [testQuestionTypes.singleAnswerQuestion]: SingleTestAnswerList,
};

export default testAnswerListTypes;
