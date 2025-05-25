import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContactsService = async ({
  page,
  perPage,
  sort,
  sortBy,
  filter,
}) => {
  try {
    const skip = (page - 1) * perPage;
    const limit = perPage;
    const contactsQuery = ContactsCollection.find();
    if (filter.contactType) {
      contactsQuery.where('contactType').equals(filter.contactType);
    }
    if (filter.isFavourite !== undefined) {
      contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }

    const [contactsCount, contacts] = await Promise.all([
      ContactsCollection.find().merge(contactsQuery).countDocuments(),
      contactsQuery
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sort })
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

export const getContactByIdService = async (id) => {
  try {
    const contact = await ContactsCollection.findById(id);
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
export const deleteContactService = async (id) => {
  try {
    const deletedContact = await ContactsCollection.findByIdAndDelete(id);
    return deletedContact;
  } catch (error) {
    throw new Error(
      `Failed to delete contact with id ${id} - ${error.message}`,
    );
  }
};
export const updateContactService = async (id, contactInfo) => {
  try {
    const updatedContact = await ContactsCollection.findByIdAndUpdate(
      id,
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
