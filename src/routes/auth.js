import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserController,
  logoutUserController,
  refreshUserSessionController,
} from '../controllers/authController.js';
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
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
