import React from "react";
import style from "./index.module.css";

const WishlistCard = ({ img, title, price }) => {
  return (
    <>
      <div className={style.cardContainer}>
        <figure className={style.cardImg}>
          <img src={img} alt="img" />
          <i className="fa-solid fa-heart"></i>
        </figure>
        <div className={style.cardInfo}>
          <div className={style.cardTitle}>
            <p>{title}</p>
          </div>
          <p className={style.cardPrice}>{price}</p>

          <div className={style.btns}>
            <button>Add to cartu</button>
            <i className="fa-regular fa-trash-can"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistCard;
