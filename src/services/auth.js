import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import UserCollection from '../db/models/user.js';
import SessionCollection from '../db/models/session.js';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../utils/generateToken.js';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/index.js';

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

export const registerUser = async (userInfo) => {
  const isUserExists = await UserCollection.findOne({ email: userInfo.email });
  if (isUserExists) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = bcrypt.hash(userInfo.password);
  return await UserCollection.create({ ...userInfo, password: hashedPassword });
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
    throw createHttpError(401, 'Session is not found');
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
