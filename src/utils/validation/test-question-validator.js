import { isEmptyString, isValid } from "./utils";

const testQuestionValidator = () => {
  const validateQuestionValue = (value) => {
    if (isEmptyString(value)) {
      return "Введите вопрос";
    }

    return null;
  };

  const validateQuestion = (question) => {
    const validationErrors = {};
    validationErrors.value = validateQuestionValue(question.value);

    return { isValid: isValid(validationErrors), validationErrors };
  };

  return {
    validateQuestion,
    validateQuestionValue,
  };
};

export default testQuestionValidator();
