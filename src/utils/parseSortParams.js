import { SORT_ORDER } from '../constants/index.js';

const parseSortOrder = (order) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(order);
  if (!isKnownOrder) {
    return SORT_ORDER.ASC;
  }
  return order;
};

const parseSortBy = (sortBy) => {
  const keysOfContact = [
    '_id',
    'name',
    'phoneNumber',
    'email',
    'isFavourite',
    'contactType',
  ];
  const isKnownKey = keysOfContact.includes(sortBy);
  if (!isKnownKey) {
    return '_id';
  }
  return sortBy;
};

export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;
  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortOrderBy = parseSortBy(sortBy);
  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortOrderBy,
  };
};
