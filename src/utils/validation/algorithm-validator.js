import { isEmptyString, isValid } from "./utils";

const algorithmValidator = () => {
  const algorithmIdPattern = /^[a-zA-Z0-9-]*$/;

  const validateId = (id) => {
    if (isEmptyString(id)) return "Введите ID алгоритма";
    if (!id.match(algorithmIdPattern)) return "ID содержит запрещённые символы";
    return null;
  };

  const validateName = (name) => {
    if (isEmptyString(name)) return "Введите название алгоритма";
    return null;
  };

  return {
    validateId,
    validateName,

    validateAlgorithm: (algorithm) => {
      const validationErrors = {};

      validationErrors.id = validateId(algorithm.id);
      validationErrors.name = validateName(algorithm.name);

      return { isValid: isValid(validationErrors), validationErrors };
    },
  };
};

export default algorithmValidator();
