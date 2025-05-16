import {
  getContact,
  getContacts,
  createContact,
  deleteContact,
  updateContact,
} from '../controllers/contacts.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

export const router = Router();

router.get('/', ctrlWrapper(getContacts));
router.get('/:id', ctrlWrapper(getContact));
router.post('/', ctrlWrapper(createContact));
router.delete('/:id', ctrlWrapper(deleteContact));
router.patch('/:id', ctrlWrapper(updateContact));
