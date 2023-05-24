function Input({ className, placeholder, value, onChangeHandler, onKeyDownHandler }) {
  return (
    <input
      placeholder={placeholder}
      className={className}
      value={value}
      onChange={onChangeHandler}
      onKeyDown={onKeyDownHandler}
    />
  );
}

export default Input;
