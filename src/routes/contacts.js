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
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/upload.js';

const router = Router();
router.use(authenticate);

router.get('/', ctrlWrapper(getContacts));
router.get('/:id', isValidId, ctrlWrapper(getContact));
router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactValidationSchema),
  ctrlWrapper(createContact),
);
router.delete('/:id', isValidId, ctrlWrapper(deleteContact));
router.patch(
  '/:id',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactValidationSchema),
  ctrlWrapper(updateContact),
);
router.put(
  '/:id',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactValidationSchema),
  ctrlWrapper(updateContact),
);

export default router;
