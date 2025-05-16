import {
  getAllContactsService,
  getContactByIdService,
  createContactService,
  deleteContactService,
  updateContactService,
} from '../services/contacts.js';
import { createHttpError } from 'http-errors';

export const getContacts = async (req, res, next) => {
  const contacts = await getAllContactsService();
  if (!contacts || contacts.length === 0) {
    return next(createHttpError(404, 'No contacts found'));
  }
  return res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactByIdService(id);
  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }
  return res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
};

export const createContact = async (req, res, next) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;
  if (!name || !phoneNumber || !contactType) {
    return next(
      createHttpError(
        400,
        'Missing required fields! Please check: name, phoneNumber, and contactType',
      ),
    );
  }
  const newContact = await createContactService({
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  });

  return res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await deleteContactService(id);
  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }
  return res.status(204).send();
};

export const updateContact = async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(createHttpError(400, 'Request body is empty!'));
  }
  const { id } = req.params;
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  const updatedContact = await updateContactService(id, {
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
  });

  if (!updatedContact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  return res.status(200).json({
    status: 200,
    message: `Successfully updated contact with id ${id}!`,
    data: updatedContact,
  });
};
