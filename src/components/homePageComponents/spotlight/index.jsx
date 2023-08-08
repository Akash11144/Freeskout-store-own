import React from "react";
import Styles from "./index.module.css";
import video from "../../../assets/spotlightVideo/spotLight.mp4";
const Spotlight = () => {
  return (
    <>
      <div className={Styles.sectionSpot}>
        <div className={Styles.heading}>
          <h1>Product Spotlight</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus
            modi libero, consequatur quibusdam veritatis earum.
          </p>
        </div>
        <video controls preload="true" muted loop>
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </>
  );
};

export default Spotlight;
