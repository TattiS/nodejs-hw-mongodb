import createHttpError from 'http-errors';
import SessionCollection from '../db/models/session.js';
import UsersCollection from '../db/models/user.js';

export const authenticate = async (req, res, next) => {
  const authenticateHeader = req.get('Authorization');
  if (!authenticateHeader) {
    next(createHttpError(401, 'Please provide an Authorization header'));
    return;
  }

  const bearer = authenticateHeader.split(' ')[0];
  const token = authenticateHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }
  const session = await SessionCollection.findOne({ accessToken: token });

  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired) {
    next(createHttpError(401, 'Access token is expired'));
    return;
  }
  const user = await UsersCollection.findById(session.userId);

  if (!user) {
    next(createHttpError(401, 'User not found'));
    return;
  }
  req.user = user;
  next();
};
