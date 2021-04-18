import testValidator from "./test-validator";
import testAnswerValidator from "./test-answer-validator";
import testQuestionValidator from "./test-question-validator";

const validator = {
  test: testValidator,
  testAnswer: testAnswerValidator,
  testQuestion: testQuestionValidator,
};

export default validator;