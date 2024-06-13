import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { createJWT } from '../utils/tokenUtils.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await hashPassword(password);

  const user = await User.create({ name, email, password: hashedPassword });

  res.status(StatusCodes.CREATED).json({ user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  // because password is set to select: false in the model so we need to select it manually

  if (!user) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  const isPasswordCorrect = await comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  const token = createJWT({ uid: user._id });

  const vaildTime = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

  res.cookie('token', token, {
    expires: vaildTime,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  res.status(StatusCodes.OK).json({ token });
};

export const logout = async (req, res) => {
  res.clearCookie('token');
  res.status(StatusCodes.OK).json({ message: 'Logged out successfully' });
};
