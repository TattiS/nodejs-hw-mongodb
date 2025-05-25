const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;

  const isValidType = (type) => ['work', 'home', 'personal'].includes(type);
  if (isValidType(type)) {
    return type;
  }
};

const parseBoolean = (isFavourite) => {
  const isString = typeof isFavourite === 'string';
  if (!isString) return;

  if (isFavourite.toLowerCase() === 'true') return true;
  if (isFavourite.toLowerCase() === 'false') return false;

  return;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseType(contactType);
  const parsedIsFavourite = parseBoolean(isFavourite);

  const parsedParams = {};

  if (parsedContactType !== undefined) {
    parsedParams.contactType = parsedContactType;
  }

  if (parsedIsFavourite !== undefined) {
    parsedParams.isFavourite = parsedIsFavourite;
  }
  return parsedParams;
};
