import { isEmptyString, isValid } from "./utils";

const testValidator = () => {
  const validateName = (name) => {
    if (isEmptyString(name)) {
      return "Введите название теста";
    }

    return null;
  };

  const validateAlgorithmIds = (algorithmIds) => {
    if (algorithmIds.length === 0) {
      return "Выберите алгоритм";
    }

    return null;
  };

  const validateTest = (test) => {
    const validationErrors = {};
    validationErrors.name = validateName(test.name);
    validationErrors.algorithmIds = validateAlgorithmIds(test.algorithmIds);

    return { isValid: isValid(validationErrors), validationErrors };
  };

  return {
    validateTest,
    validateName,
    validateAlgorithmIds,
  };
};

export default testValidator();
