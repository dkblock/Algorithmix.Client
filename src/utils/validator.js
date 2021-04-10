const validator = () => {
  const validateTestName = (name) => {
    if (isEmptyString(name)) {
      return "Введите название теста";
    }

    return null;
  };

  const validateTest = (test) => {
    const validationErrors = {};
    validationErrors.name = validateTestName(test.name);

    return { isValid: isValid(validationErrors), validationErrors };
  };

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

  const isEmptyString = (str) => !str || str.length === 0;

  const isValid = (validationErrors) =>
    Object.keys(validationErrors).filter((key) => validationErrors[key] !== null).length === 0;

  return {
    test: {
      validateName: validateTestName,
      validateTest,
    },

    testQuestion: {
      validateQuestionValue,
      validateQuestion,
    },
  };
};

export default validator();
