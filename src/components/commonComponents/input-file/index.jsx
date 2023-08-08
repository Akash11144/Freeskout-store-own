import { useEffect, useRef, useState } from "react";
import Styles from "./index.module.css";

export function InputFile(props) {
  const {
    multiple = false,
    accept,
    name,
    onChange,
    err,
    displaySize,
    imagesData,
  } = props;

  const inputFileRef = useRef(null);

  const { createObjectURL } = URL;

  return (
    <div>
      <button onClick={openPicker} className={Styles.inputBox}>
        Select Video
      </button>
      <input
        ref={inputFileRef}
        type={"file"}
        name={name}
        multiple={multiple}
        accept={accept}
        onChange={handleFileInput}
        className={Styles.hiddenFileInput}
      />
      <div className="d-flex justify-content-start align-items-center flex-wrap">
        {imagesData ? (
          imagesData.map((image, index) => (
            <div key={index} style={{ position: "relative" }}>
              <button
                className={Styles.crossBtn}
                onClick={() => handleDeleteImage(index)}
              >
                X
              </button>
              <video
                className={`${
                  displaySize === "small" ? Styles.smallImages : ""
                } ${displaySize === "medium" ? Styles.mediumImages : ""} ${
                  displaySize === "large" ? Styles.largeImages : ""
                }`}
                src={createObjectURL(image)}
              ></video>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      {err ? (
        <div className={Styles.errorTextContainer}>
          <p>{err}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );

  function openPicker() {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  }

  function handleFileInput(e) {
    onChange(Object.values(e.target.files));
  }

  function handleDeleteImage(v) {
    let newData = imagesData.filter((d, i) => i !== v);
    onChange(newData);
  }
}
