import { isEmptyString, isValid } from "./utils";

const groupValidator = () => {
  const validateName = (name) => {
    if (isEmptyString(name)) return "Введите название группы";
    return null;
  };

  return {
    validateName,

    validateGroup: (group) => {
      const validationErrors = {};
      validationErrors.name = validateName(group.name);

      return { isValid: isValid(validationErrors), validationErrors };
    },
  };
};

export default groupValidator();
