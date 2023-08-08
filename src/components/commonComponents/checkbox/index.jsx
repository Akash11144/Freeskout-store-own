import Styles from "./index.module.css";

export function InputCheckBox(props) {
  const {
    chkStyles,
    title,
    disabled = false,
    checked,
    name,
    value,
    onChange,
    err,
  } = props;
  return (
    <div>
      <div className={`d-flex gap-2 justify-content-start align-item-center`}>
        <input
          type={"checkbox"}
          disabled={disabled}
          checked={checked}
          name={name}
          value={value}
          onChange={onChange}
          className={`form-checkbox ${Styles.checkboxStyle} ${
            chkStyles ? chkStyles : ""
          } ${err ? Styles.chkErrStyles : ""}`}
        />
        {title ? <small>{title}</small> : <></>}
      </div>
      {err ? (
        <div>
          <p>{err}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
