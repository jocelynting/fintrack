import mongoose from 'mongoose';
import Subcategory from './Subcategory.js';
import { BILL_TYPE } from '../utils/constants.js';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  type: {
    type: String,
    enum: Object.values(BILL_TYPE),
    required: [true, 'Type is required'],
  },
  subcategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subcategory',
    },
  ],
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
