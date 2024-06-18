import { useBillContext } from '../pages/Bills';

const BillCategorySelect = ({
  name,
  labelText,
  categories,
  onChange,
  showLabel,
}) => {
  const { updateBillFormData } = useBillContext();

  const handleInputChange = (e) => {
    updateBillFormData((prevFormData) => ({
      ...prevFormData,
      [name]: e.target.value,
    }));
    if (onChange) {
      onChange(e);
    }
  };

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
        onChange={handleInputChange}
      >
        {categories.map((category) => (
          <option
            value={category._id}
            key={category._id}
            onChange={handleInputChange}
          >
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BillCategorySelect;
