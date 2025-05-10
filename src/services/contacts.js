import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  try {
    const contacts = await ContactsCollection.find();
    return contacts;
  } catch (error) {
    console.error("Can't get all contacts");
    throw new Error('Error with get all contacts service' + error.message);
  }
};

export const getContactById = async (id) => {
  try {
    const contact = await ContactsCollection.findById(id);
    if (!contact) {
      console.error(`Can't find contact by such id ${id}`);
      throw new Error("Can't find contact by id");
    }
    return contact;
  } catch (error) {
    console.error(`Can't get contact by id ${id}`);
    throw new Error('Error with get contact by id service ' + error.message);
  }
};
