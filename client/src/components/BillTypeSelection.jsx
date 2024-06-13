import FormCategorySelect from './FormCategorySelect';

const BillTypeSelection = ({
  categories,
  type,
  handleCategoryChange,
  selectedCategory,
}) => {
  return (
    <div className="form__row-category">
      <FormCategorySelect
        name="category"
        labelText="Category"
        categories={categories.filter((category) => category.type === type)}
        onChange={handleCategoryChange}
        showLabel={true}
      />
      {type === 'expense' && (
        <FormCategorySelect
          name="subcategory"
          categories={selectedCategory.subcategories}
          showLabel={false}
        />
      )}
    </div>
  );
};

export default BillTypeSelection;
