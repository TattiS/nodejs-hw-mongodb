import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import UserCollection from '../db/models/user.js';
import SessionCollection from '../db/models/session.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/generateAccessToken.js';
import { sendMail } from '../utils/sendMail.js';
import * as fs from 'node:fs';
import path from 'node:path';
import jwt from 'jsonwebtoken';
import Handlebars from 'handlebars';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/index.js';
import { getEnvValue } from '../utils/getEnvValue.js';

const RESET_PASSWORD_TEMPLATE = fs.readFileSync(
  path.resolve('src', 'templates', 'reset-password.hbs'),
  'utf-8',
);

const createSession = () => {
  const accessToken = generateAccessToken();
  const refreshToken = generateRefreshToken();
  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  };
};

export const registerUser = async (payload) => {
  const isUserExists = await UserCollection.findOne({ email: payload.email });
  if (isUserExists) {
    throw new createHttpError.Conflict('Email is already in use');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);
  return UserCollection.create({ ...payload, password: hashedPassword });
};

export const loginUser = async (payload) => {
  const user = await UserCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) {
    throw createHttpError(401, 'Invalid login or password');
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const createdSession = createSession();
  console.log(createdSession);
  return await SessionCollection.create({
    userId: user._id,
    ...createdSession,
  });
};

export const refreshUserSession = async ({ sessionId, refreshToken }) => {
  const currentSession = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!currentSession) {
    throw createHttpError(404, 'Session is not found');
  }

  const isRefreshTokenExpired =
    new Date() > new Date(currentSession.refreshTokenValidUntil);

  if (isRefreshTokenExpired) {
    throw createHttpError(401, 'Session token is expired');
  }

  await SessionCollection.deleteOne({ _id: sessionId, refreshToken });
  const newSession = createSession();

  return await SessionCollection.create({
    userId: currentSession.userId,
    ...newSession,
  });
};

export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

export const requestResetPassword = async (email) => {
  const user = await UserCollection.findOne({ email });

  if (user === null) {
    throw new createHttpError.NotFound(`User not found`);
  }
  const token = jwt.sign(
    {
      sub: user._id,
      name: user.name,
    },
    getEnvValue('JWT_SECRET'),
    { expiresIn: '5m' },
  );
  const template = Handlebars.compile(RESET_PASSWORD_TEMPLATE);
  try {
    await sendMail(
      user.email,
      'Reset password',
      template({
        name: user.name,
        link: `${getEnvValue('APP_DOMAIN')}/reset-pwd?token=${token}`,
      }),
    );
  } catch (error) {
    throw new createHttpError(
      500,
      `Failed to send the email, please try again later. ${error.message}`,
    );
  }
};

export const resetPassword = async (password, token) => {
  try {
    const decoded = jwt.verify(token, getEnvValue('JWT_SECRET'));
    const user = await UserCollection.findById(decoded.sub);
    if (!user) {
      throw new createHttpError.NotFound('User not found');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserCollection.findByIdAndUpdate(user._id, {
      password: hashedPassword,
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new createHttpError.Unauthorized('Token is unauthorized');
    }
    if (error.name === 'TokenExpiredError') {
      throw new createHttpError.Unauthorized('Token is expired');
    }
    throw new createHttpError(500, error.message);
  }
};
