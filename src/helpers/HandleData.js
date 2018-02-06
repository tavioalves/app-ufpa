import { onlyLetters, onlyNumbers, dateFormat } from '../config/Config';

export const validateLetters = (text) => {
    const validateText = onlyLetters.exec(text);
    if (validateText) return text;
};

export const validateNumbers = (number) => {
    const validateNumber = onlyNumbers.exec(number);
    if (validateNumber) return number;
};
export const validateDates = (date) => {
    const validateDate = dateFormat.exec(date);
    if (validateDate) return date;
};