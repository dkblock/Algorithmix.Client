import { isEmptyString, isValid } from "./utils";

const testAnswerValidator = () => {
  const validateAnswerValue = (value) => {
    if (isEmptyString(value)) {
      return "Введите ответ";
    }

    return null;
  };

  const validateAnswer = (answer) => {
    const validationErrors = {};
    validationErrors.value = validateAnswerValue(answer.value);

    return { isValid: isValid(validationErrors), validationErrors };
  };

  return {
    validateAnswer,
    validateAnswerValue,
  };
};

export default testAnswerValidator();