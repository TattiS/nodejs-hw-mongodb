import { ContactsCollection } from '../db/models/contact.js';

export const getAllContactsService = async () => {
  try {
    const contacts = await ContactsCollection.find();
    return contacts;
  } catch (error) {
    throw new Error('Failed to fetch contacts', error);
  }
};

export const getContactByIdService = async (id) => {
  try {
    const contact = await ContactsCollection.findById(id);
    return contact;
  } catch (error) {
    throw new Error(`Failed to fetch contact with id ${id}`, error);
  }
};

export const createContactService = async (contactInfo) => {
  try {
    const newContact = await ContactsCollection.create(contactInfo);
    return newContact;
  } catch (error) {
    throw new Error('Failed to create a new contact', error);
  }
};
export const deleteContactService = async (id) => {
  try {
    const deletedContact = await ContactsCollection.findByIdAndDelete(id);
    return deletedContact;
  } catch (error) {
    throw new Error(`Failed to delete contact with id ${id}`, error);
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
    throw new Error(`Failed to update contact with id ${id}`, error);
  }
};
