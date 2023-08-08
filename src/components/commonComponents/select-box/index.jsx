import { useState } from "react";
import Styles from "./index.module.css";

export function SelectBox(props) {
  const { optionsData, value, onChange, label, labelStyles, inputStyles } =
    props;

  const [showOptions, setshowOptions] = useState(false);

  return (
    <div className="position-relative">
      {label ? <label className={`${labelStyles}`}>{label}</label> : <></>}
      <div>
        <input
          className={`form-control ${inputStyles}`}
          readOnly
          value={value}
          onClick={() => setshowOptions(true)}
        />
      </div>
      <div className="position-absolute d-flex flex-column justify-content-start align-items-start mt-1">
        {showOptions ? (
          optionsData.map((item, index) => (
            <input
              className={`form-control ${inputStyles}`}
              key={index}
              onClick={() => {
                onChange(item);
                setshowOptions(false);
              }}
              value={item}
              readOnly
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
