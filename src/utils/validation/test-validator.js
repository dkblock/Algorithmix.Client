import { isEmptyString, isValid } from "./utils";

const testValidator = () => {
  const validateName = (name) => {
    if (isEmptyString(name)) {
      return "Введите название теста";
    }

    return null;
  };

  const validateTest = (test) => {
    const validationErrors = {};
    validationErrors.name = validateName(test.name);

    return { isValid: isValid(validationErrors), validationErrors };
  };

  return {
    validateTest,
    validateName,
  };
};

export default testValidator();
