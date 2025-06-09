import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserController,
  logoutUserController,
  refreshUserSessionController,
  requestResetPasswordController,
  resetPasswordController,
} from '../controllers/authController.js';
import {
  registerUserSchema,
  loginUserSchema,
  requestResetPasswordSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import { loginUserController } from '../controllers/authController.js';
import { validateBody } from '../middlewares/validateBody.js';
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
router.post('/refresh', ctrlWrapper(refreshUserSessionController));
router.post('/logout', ctrlWrapper(logoutUserController));
router.post(
  '/send-reset-email',
  validateBody(requestResetPasswordSchema),
  ctrlWrapper(requestResetPasswordController),
);
router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;
