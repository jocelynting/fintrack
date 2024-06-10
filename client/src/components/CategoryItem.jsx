import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdKeyboardArrowDown } from 'react-icons/md';
import SubCategoryItem from './SubCategoryItem';
import { useState } from 'react';

const CategoryItem = () => {
  const [showSubCategory, setShowSubCategory] = useState(false);

  const toggleSubCategory = () => {
    setShowSubCategory(!showSubCategory);
  };

  return (
    <div>
      <p className="category__name">name</p>
      <button className="category__btn">Edit</button>
      <button className="category__btn">Delete</button>
      <button className="category__btn" onClick={toggleSubCategory}>
        {showSubCategory ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
      </button>
      {showSubCategory && (
        <div className="category__subcategories">
          <SubCategoryItem />
          <SubCategoryItem />
          <SubCategoryItem />
          <SubCategoryItem />
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
