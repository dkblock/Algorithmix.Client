import { isEmptyString } from "../../../utils/is-empty-string";

const validator = () => {
    const validateName = (name) => {
        if (isEmptyString(name))
            return "Введите название теста" ;

        return null;
    };

    const validateTest = (test) => {
        const validationErrors = {};
        validationErrors.name = validateName(test.name);

        return { isValid: isValid(validationErrors), validationErrors };
    };

    const isValid = (validationErrors) =>
        Object.keys(validationErrors).filter((key) => validationErrors[key] !== null).length === 0;

    return {
        validateName,
        validateTest
    };
};

export default validator();