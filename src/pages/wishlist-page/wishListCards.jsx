import React from "react";
import Styles from "./index.module.css";
import { Nav } from "react-bootstrap";
import { formatCurrency } from "../../utlils/variables-and-small functions";
import { NavLink } from "react-router-dom";
const WishlistCard = (props) => {
  const { image, productName, price, productId } = props;
  return (
    <>
      <div className={Styles.cardContainer}>
        <figure className={Styles.cardImg}>
          <img src={image} alt="img" />
          <i className="fa-solid fa-heart"></i>
        </figure>
        <div className={Styles.cardInfo}>
          <div className={Styles.cardTitle}>
            <p>{productName}</p>
          </div>
          <p> {formatCurrency(price)}</p>

          <Nav.Link
            as={NavLink}
            to={`/product-info/${productId}`}
            className={Styles.btns}
          >
            <button className="btn btn-outline-secondary">View</button>
          </Nav.Link>
        </div>
      </div>
    </>
  );
};

export default WishlistCard;
