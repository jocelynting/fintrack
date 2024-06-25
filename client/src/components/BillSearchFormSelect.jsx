const BillSearchFormSelect = ({ name, onChange, options, showName, value }) => {
  return (
    <select
      className="form__select"
      name={name}
      id={name}
      onChange={onChange}
      value={value}
    >
      {options.map((option) => (
        <option value={showName ? option.name : option._id} key={option.name}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default BillSearchFormSelect;
