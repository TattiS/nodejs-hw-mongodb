import { Router } from 'express';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';
import { registerUserSchema } from '../schemas/userSchemas.js';
import {
  registerUserController,
  logoutUserController,
  refreshUserSessionController,
} from '../controllers/authController.js';
import { loginUserSchema } from '../validation/auth.js';
import { loginUserController } from '../controllers/authController.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);
router.post(
  '/refresh',
  authenticate,
  ctrlWrapper(refreshUserSessionController),
);
router.post('/logout', authenticate, ctrlWrapper(logoutUserController));

export default router;
