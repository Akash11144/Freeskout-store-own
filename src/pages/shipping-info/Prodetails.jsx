import React from "react";
import style from "./checkout.module.css";

const Prodetails = (props) => {
  let { cartProduct, newCount } = props;
  return (
    <>
      {/* {console.log("props in proDetail : ", cartProduct[0], newCount)} */}
      <div className={style.odrItem}>
        <picture className={style.pictureImg}>
          <img
            src={cartProduct && cartProduct[0].images[0].secureUrl}
            alt="watch"
          />
        </picture>
        <div className={style.itemDetails}>
          <div className={style.title}>
            <h6>
              <strong>{cartProduct && cartProduct[0].productName}</strong>
            </h6>
            <i className="fa-solid fa-xmark"></i>
          </div>
          <div className={style.price}>
            <p>₹ {cartProduct[0].price}</p>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default Prodetails;
