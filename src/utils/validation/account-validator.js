import { isEmail, isEmptyString, isValid } from "./utils";

const accountValidator = () => {
  const validateEmail = (email) => {
    if (isEmptyString(email)) return "Введите Email";
    if (!isEmail(email)) return "Неверный формат Email";
    return null;
  };

  const validateGroupId = (groupId) => {
    if (groupId === 1) return "Выберите группу";
    return null;
  };

  const validateFirstName = (firstName) => {
    if (isEmptyString(firstName)) return "Введите имя";
    return null;
  };

  const validateLastName = (lastName) => {
    if (isEmptyString(lastName)) return "Введите фамилию";
    return null;
  };

  const validatePassword = (password) => {
    if (isEmptyString(password)) return "Введите пароль";
    if (password.length < 6) return "Минимальная длина пароля составляет 6 символов";
    return null;
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    const error = validatePassword(confirmPassword);

    if (error) return error;
    if (password !== confirmPassword) return "Пароли не совпадают";
    return null;
  };

  const validateEmailOnLogin = (email) => {
    if (isEmptyString(email)) return "Введите Email";
    return null;
  };

  const validatePasswordOnLogin = (password) => {
    if (isEmptyString(password)) return "Введите пароль";
    return null;
  };

  return {
    validateEmail,
    validateFirstName,
    validateLastName,
    validatePassword,
    validateConfirmPassword,

    validateOnRegister: (credentials) => {
      const validationErrors = {};

      validationErrors.email = validateEmail(credentials.email);
      validationErrors.groupId = validateGroupId(credentials.groupId);
      validationErrors.firstName = validateFirstName(credentials.firstName);
      validationErrors.lastName = validateLastName(credentials.lastName);
      validationErrors.password = validatePassword(credentials.password);
      validationErrors.confirmPassword = validateConfirmPassword(credentials.confirmPassword, credentials.password);

      return { isValid: isValid(validationErrors), validationErrors };
    },

    validateEmailOnLogin,
    validatePasswordOnLogin,

    validateOnLogin: ({ email, password }) => {
      const validationErrors = {};

      validationErrors.email = validateEmailOnLogin(email);
      validationErrors.password = validatePasswordOnLogin(password);

      return { isValid: isValid(validationErrors), validationErrors };
    },

    validateOnUpdateUserInformation: ({ firstName, lastName, email }) => {
      const validationErrors = {};

      validationErrors.email = validateEmail(email);
      validationErrors.firstName = validateFirstName(firstName);
      validationErrors.lastName = validateLastName(lastName);

      return { isValid: isValid(validationErrors), validationErrors };
    },
  };
};

export default accountValidator();
