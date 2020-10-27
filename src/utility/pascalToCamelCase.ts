export const pascalToCamelCase = (str: string) => {
  if (typeof str !== 'string' || !str.length) {
    throw new Error('InvalidArgumentException');
  }

  return str[0].toLowerCase() + str.slice(1);
};
