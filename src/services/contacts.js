import { ContactsCollection } from '../db/models/contact.js';

export const getAllContactsService = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactByIdService = async (id) => {
  const contact = await ContactsCollection.findById(id);
  return contact;
};

export const createContactService = async (contactInfo) => {
  const newContact = await ContactsCollection.create(contactInfo);
  return newContact;
};
export const deleteContactService = async (id) => {
  const deletedContact = await ContactsCollection.findByIdAndDelete(id);
  return deletedContact;
};
export const updateContactService = async (id, contactInfo) => {
  const updatedContact = await ContactsCollection.findByIdAndUpdate(
    id,
    contactInfo,
    { new: true },
  );
  return updatedContact;
};
