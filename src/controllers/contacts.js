import createError from 'http-errors';
import {
  getAllContactsService,
  getContactByIdService,
  createContactService,
  deleteContactService,
  updateContactService,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import createHttpError from 'http-errors';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const getContacts = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const { _id: userId } = req.user;
  if (!userId) {
    return next(new createHttpError(401, 'User not authenticated'));
  }
  const contacts = await getAllContactsService({
    page,
    perPage,
    sortOrder,
    sortBy,
    filter,
    userId,
  });
  if (!contacts || contacts.length === 0) {
    return next(createError(404, 'No contacts found'));
  }
  return res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  if (!userId) {
    return next(new createHttpError(401, 'User not authenticated'));
  }
  const contact = await getContactByIdService(id, userId);
  if (!contact) {
    return next(createError(404, `Contact with id ${id} not found`));
  }
  return res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
};

export const createContact = async (req, res, next) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;
  const { _id: userId } = req.user;
  if (!userId) {
    return next(new createHttpError(401, 'User not authenticated'));
  }
  if (!name || !phoneNumber || !contactType) {
    return next(
      createError(
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
    userId,
  });
  if (!newContact) {
    return next(createError(404, 'Contact not created'));
  }
  return res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  if (!userId) {
    return next(new createHttpError(401, 'User not authenticated'));
  }
  const contact = await deleteContactService(id, userId);
  if (!contact) {
    return next(createError(404, `Contact with id=${id} not found`));
  }
  return res.status(204).send();
};

export const updateContact = async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(createError(400, 'Request body is empty!'));
  }
  const { id } = req.params;
  const photo = req.file;
  let photoUrl;

  const { name, phoneNumber, email, isFavourite, contactType } = req.body;
  const { _id: userId } = req.user;
  if (!userId) {
    return next(new createHttpError(401, 'User not authenticated'));
  }
  if (photo) {
    photoUrl = await saveFileToUploadDir(photo);
  }

  const updatedContact = await updateContactService(id, userId, {
    name,
    phoneNumber,
    email,
    isFavourite,
    contactType,
    photo: photoUrl,
  });

  if (!updatedContact) {
    return next(createError(404, `Contact with id ${id} not found`));
  }

  return res.status(200).json({
    status: 200,
    message: `Successfully updated contact with id ${id}!`,
    data: updatedContact,
  });
};
