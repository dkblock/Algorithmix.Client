export const isEmptyString = (str) => !str || str.length === 0;

export const isValid = (validationErrors) =>
  Object.keys(validationErrors).filter((key) => validationErrors[key] !== null).length === 0;