const FormCategorySelect = ({
  name,
  labelText,
  categories,
  onChange,
  showLabel,
}) => {
  return (
    <div className={showLabel ? 'form__row' : 'form__row subcategory'}>
      {showLabel && (
        <label htmlFor={name} className="form__label">
          {labelText || name}
        </label>
      )}
      <select
        className="category__select"
        name={name}
        id={name}
        onChange={onChange}
      >
        {categories.map((category) => (
          <option value={category._id} key={category._id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormCategorySelect;
