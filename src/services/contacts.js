import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContactsService = async ({
  page,
  perPage,
  sortOrder,
  sortBy,
  filter,
  userId,
}) => {
  try {
    const skip = (page - 1) * perPage;
    const limit = perPage;

    const query = { userId };
    if (filter.contactType) {
      query.contactType = filter.contactType;
    }
    if (filter.isFavourite !== undefined) {
      query.isFavourite = filter.isFavourite;
    }

    const [contactsCount, contacts] = await Promise.all([
      ContactsCollection.countDocuments(query),
      ContactsCollection.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrder })
        .exec(),
    ]);
    const paginationInfo = calculatePaginationData(
      contactsCount,
      page,
      perPage,
    );
    return {
      data: contacts,
      ...paginationInfo,
    };
  } catch (error) {
    throw new Error(`Failed to fetch contacts - ${error.message}`);
  }
};

export const getContactByIdService = async (id, userId) => {
  try {
    const contact = await ContactsCollection.findOne({ _id: id, userId });
    return contact;
  } catch (error) {
    throw new Error(`Failed to fetch contact with id ${id} - ${error.message}`);
  }
};

export const createContactService = async (contactInfo) => {
  try {
    const newContact = await ContactsCollection.create(contactInfo);
    return newContact;
  } catch (error) {
    throw new Error(`Failed to create a new contact - ${error.message}`);
  }
};

export const deleteContactService = async (id, userId) => {
  try {
    const deletedContact = await ContactsCollection.findOneAndDelete({
      _id: id,
      userId,
    });
    return deletedContact;
  } catch (error) {
    throw new Error(
      `Failed to delete contact with id ${id} - ${error.message}`,
    );
  }
};
export const updateContactService = async (id, userId, contactInfo) => {
  try {
    const updatedContact = await ContactsCollection.findOneAndUpdate(
      { _id: id, userId },
      contactInfo,
      { new: true },
    );
    return updatedContact;
  } catch (error) {
    throw new Error(
      `Failed to update contact with id ${id} - ${error.message}`,
    );
  }
};
