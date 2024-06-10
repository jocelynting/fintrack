import { StatusCodes } from 'http-status-codes';
import Category from '../models/Category.js';

export const getAllCategories = async (req, res) => {
  const categories = await Category.find().populate('subcategories');

  res.status(StatusCodes.OK).json({ categories });
};
