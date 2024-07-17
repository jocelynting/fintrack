import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import Subcategory from './models/Subcategory.js';
import Bill from './models/Bill.js';
import User from './models/User.js';
import { faker } from '@faker-js/faker';

dotenv.config();

await mongoose.connect(process.env.MONGO_URL);

const categories = await Category.find();
const subcategories = await Subcategory.find();
const users = await User.find(); // Assuming you have some users already

const getRandomItem = (array) =>
  array[Math.floor(Math.random() * array.length)];

const generateFakeBills = (numBills) => {
  const bills = [];
  for (let i = 0; i < numBills; i++) {
    const user = getRandomItem(users);
    const category = getRandomItem(categories);

    let subcategory = null;
    // If category has subcategories, select a random one
    if (category.type === 'expense' && category.subcategories.length > 0) {
      subcategory = getRandomItem(
        subcategories.filter(
          (sub) => sub.category.toString() === category._id.toString()
        )
      );
    }

    const bill = new Bill({
      amount: faker.finance.amount(),
      type: category.type,
      category: category._id,
      subcategory: subcategory ? subcategory._id : null,
      description: faker.lorem.sentence(),
      user: user._id,
      createAt: faker.date.past(),
      updateAt: faker.date.recent(),
    });
    bills.push(bill);
  }
  return bills;
};

const fakeBills = generateFakeBills(50); // Generate fake bills
// console.log(fakeBills);
await Bill.insertMany(fakeBills);

console.log('Fake bills have been added to the database.');
process.exit(0);
