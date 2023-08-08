import Styles from "./index.module.css";

export function Input(props) {
  const {
    type,
    inputStyles,
    minLength,
    maxLength,
    label,
    labelStyles,
    placeholder,
    disabled = false,
    checked,
    name,
    value,
    onChange,
    onKeyDown,
    err,
    containerClasses = "",
  } = props;
  return (
    <div className={`${containerClasses}`}>
      {label ? (
        <p
          className={`${Styles.commonLabelStyles} ${
            labelStyles ? labelStyles : ""
          }}`}
        >
          {label}
        </p>
      ) : (
        <></>
      )}
      <input
        type={type}
        maxLength={maxLength}
        minLength={minLength}
        placeholder={placeholder}
        disabled={disabled}
        // checked={checked}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        // maxLength={"2"}
        className={`form-control my-2 ${Styles.inputStyles} ${
          inputStyles ? inputStyles : ""
        } ${err ? Styles.inputErrStyles : ""}`}
      />
      {err ? (
        <div className={Styles.errorTextContainer}>
          <p>{err}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
