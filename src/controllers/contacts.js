import { getAllContacts, getContactById } from '../services/contacts.js';

export const getContacts = async (req, res) => {
  try {
    const contacts = await getAllContacts();
    return res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: 'Error with get all contacts',
      error: error.message,
    });
  }
};

export const getContact = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await getContactById(id);
    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data: contact,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: 'Error with get contact by id',
      error: error.message,
    });
  }
};
