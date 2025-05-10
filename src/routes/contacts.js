import { getContact, getContacts } from '../controllers/contacts.js';
import { Router } from 'express';

export const router = Router();

router.get('/', getContacts);
router.get('/:id', getContact);
