const parseNumber = (value, defaultValue) => {
  if (typeof value === 'string') {
    return defaultValue;
  }
  const parsedValue = parseInt(value);
  return isNaN(parsedValue) ? defaultValue : parsedValue;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;
  const parsedPage = parseNumber(page, 1);
  const parsedLimit = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedLimit,
  };
};
