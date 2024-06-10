import mongoose from 'mongoose';

const subcategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
  },
});

const Subcategory = mongoose.model('Subcategory', subcategoriesSchema);

export default Subcategory;
