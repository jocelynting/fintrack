import { CategoryItem } from '../components';

const Category = () => {
  return (
    <div>
      <div className="category__btns">
        <button className="category__btn btn">Outcome</button>
        <button className="category__btn btn">Income</button>
      </div>
      <div className="category__list">
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
      </div>
    </div>
  );
};

export default Category;
