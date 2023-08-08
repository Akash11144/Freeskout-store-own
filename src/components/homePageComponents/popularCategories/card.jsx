import React from "react";
import Styles from "./index.module.css";
import { Link } from "react-router-dom";
const PopularCategoryCard = (props) => {
  return (
    <React.Fragment>
      <Link
        to={`/categoryProducts/${props.category}`}
        style={{ textDecoration: "none" }}
      >
        <div className={Styles.categoryCard}>
          <img
            src={props.imgSrc}
            alt={props.imgAlt}
            className={Styles.categoryCardImg}
          />
          <div className={Styles.categoryCardDesc}>
            <h5 style={{ textTransform: "capitalize" }}>{props.category}</h5>
          </div>
        </div>
      </Link>
    </React.Fragment>
  );
};

export default PopularCategoryCard;
