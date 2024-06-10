import { UnauthenticatedError } from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError('authentication invalid');
  }

  try {
    const { uid } = verifyJWT(token);
    req.user = { uid };
    next();
  } catch (error) {
    throw new UnauthenticatedError('authentication invalid');
  }
};
