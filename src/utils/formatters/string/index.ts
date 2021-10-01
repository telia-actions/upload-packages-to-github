export const toAlphaNumeric = (string: string, replaceValue = '') => {
  return string.replace(/[^A-Z0-9]+/gi, replaceValue);
};
