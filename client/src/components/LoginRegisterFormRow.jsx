const LoginRegisterFormRow = ({
  name,
  type,
  labelText,
  defaultValue,
  error,
}) => {
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

export default LoginRegisterFormRow;
