export const isEmptyString = (str) => !str || str.length === 0;

export const isEmail = (str) => {
  const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return str.match(regex);
}

export const isValid = (validationErrors) =>
  Object.keys(validationErrors).filter((key) => validationErrors[key] !== null).length === 0;