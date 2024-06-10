import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import Subcategory from './models/Subcategory.js';

dotenv.config();

try {
  await mongoose.connect(process.env.MONGO_URL);

  const categories = JSON.parse(
    await readFile(new URL('./utils/categories.json', import.meta.url))
  );

  await Category.deleteMany({});
  await Subcategory.deleteMany({});

  // 遍历每个父类别
  for (const categoryInfo of categories) {
    // 创建父类别文档
    const category = await Category.create({
      name: categoryInfo.name,
      type: categoryInfo.type,
    });

    await category.save();

    // 遍历父类别的子类别并创建子类别文档
    if (categoryInfo.subcategories && categoryInfo.subcategories.length > 0) {
      const subcategoryPromises = categoryInfo.subcategories.map(
        async (subcategoryData) => {
          const subcategory = new Subcategory({
            name: subcategoryData,
            category: category._id,
          });
          await subcategory.save();
          category.subcategories.push(subcategory._id);
        }
      );
      await Promise.all(subcategoryPromises);
      await category.save(); // 保存更新后的category文档
    }
  }

  console.log('Success!!! Categories have been imported.');
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
