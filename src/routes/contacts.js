import {
  getContact,
  getContacts,
  createContact,
  deleteContact,
  updateContact,
} from '../controllers/contacts.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactValidationSchema,
  updateContactValidationSchema,
} from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

export const router = Router();

router.get('/', ctrlWrapper(getContacts));
router.get('/:id', isValidId, ctrlWrapper(getContact));
router.post(
  '/',
  validateBody(createContactValidationSchema),
  ctrlWrapper(createContact),
);
router.delete('/:id', isValidId, ctrlWrapper(deleteContact));
router.patch(
  '/:id',
  isValidId,
  validateBody(updateContactValidationSchema),
  ctrlWrapper(updateContact),
);
