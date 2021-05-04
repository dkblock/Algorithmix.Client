import accountValidator from "./account-validator";
import groupValidator from "./group-validator";
import testValidator from "./test-validator";
import testAnswerValidator from "./test-answer-validator";
import testQuestionValidator from "./test-question-validator";

const validator = {
  account: accountValidator,
  group: groupValidator,
  test: testValidator,
  testAnswer: testAnswerValidator,
  testQuestion: testQuestionValidator,
};

export default validator;
