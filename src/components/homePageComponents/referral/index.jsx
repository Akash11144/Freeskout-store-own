import React, { useEffect, useRef, useState } from "react";
import Styles from "./index.module.css";
import avatar from "../../../assets/testingImgs/refer.png";
import { FaShareAlt } from "react-icons/fa";
import { useLocation } from "react-router";
import { RWebShare } from "react-web-share";
const Referals = () => {
  const [url, setUrl] = useState(window.location ? window.location.href : "");
  useEffect(() => {
    const handleUrlChange = () => {
      setUrl(window.location.href);
    };
    window.addEventListener("popstate", handleUrlChange);
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);
  const textRef = useRef(null);
  return (
    <>
      <div className={Styles.sectionRef}>
        <div className={Styles.refCont}>
          <div className={Styles.left}>
            <picture className={Styles.referImg}>
              <img src={avatar} alt="" />
            </picture>
          </div>
          <div className={Styles.right}>
            <h2>
              Refer your <span>Friends</span>{" "}
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. and sum
              of Dignissimos, reprehenderit ssence dnej nhe bedk
            </p>
            <div className={Styles.refCode}>
              <div className={Styles.code}>
                <input
                  type="text"
                  disabled
                  ref={textRef}
                  value={url}
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    margin: "none",
                    backgroundColor: "transparent",
                  }}
                ></input>
              </div>
              <RWebShare
                data={{
                  text: "Web Share - GfG",
                  url: url,
                  title: "Share Link",
                }}
              >
                <FaShareAlt className={Styles.shareIcon}></FaShareAlt>
              </RWebShare>
            </div>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. and sum
              of Dignissimos, dkfi gundf ssence dnej nhe bedk
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Referals;
