import { StatusCodes } from 'http-status-codes';
import User from '../models/User.js';

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.uid });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password; // can't update password here

  const updatedUser = await User.findByIdAndUpdate(req.user.uid, newUser);
  // this findByIDAndUpdate method will return the old user data, if you want to get the updated user data you can add {new: true} as the third argument

  res.status(StatusCodes.OK).json({ msg: 'update user' });
};
