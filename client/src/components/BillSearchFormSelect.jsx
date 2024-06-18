const BillSearchFormSelect = ({ name, onChange, options, value }) => {
  return (
    <select
      className="form__select"
      name={name}
      id={name}
      onChange={onChange}
      value={value}
    >
      {options.map((option) => (
        <option value={option.name} key={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default BillSearchFormSelect;
