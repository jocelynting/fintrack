const FormRow = ({
  type,
  name,
  labelText,
  defaultValue,
  error,
  radioOptions,
  onChange,
}) => {
  if (radioOptions) {
    return (
      <div className="form__row-radio" onChange={onChange}>
        <label className="form__label">Bill Type</label>
        <div className="form__radio-group">
          {radioOptions.map((option) => (
            <div className="form__radio" key={option.value}>
              <input
                type="radio"
                value={option.value}
                name={name}
                defaultChecked={option.checked}
              />
              <label className="form__label--radio">{option.label}</label>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="form__row">
      <label htmlFor={name} className="form__label">
        {labelText || name}
      </label>
      <input
        className="form__input"
        type={type}
        name={name}
        id={name}
        defaultValue={defaultValue || ''}
      />
      {error && <span className="form__error-message">{error}</span>}
    </div>
  );
};

export default FormRow;
