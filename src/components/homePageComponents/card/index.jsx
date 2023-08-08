import Styles from "./index.module.css";
import Like from "../../like";
import { AiTwotoneStar } from "react-icons/ai";
import soldOutIcon from "../../../assets/icons/icons8-sold-out-64.png";
import { hasInventory } from "../../../utlils/variables-and-small functions";
import { Link } from "react-router-dom";
import { forwardRef } from "react";

// //////////////////////////////////////////////////////////////////////////

const ProductCard = forwardRef(function ProductCard(props, refProp) {
  const renderStars = (numStars, id) => {
    const stars = [];
    const num = numStars === 0 ? 5 : Math.round(numStars);
    for (let i = 1; i <= num; i++) {
      stars.push(
        <span key={id + i}>
          <AiTwotoneStar style={{ color: i <= num ? "gold" : "gray" }} />
        </span>
      );
    }
    return stars;
  };

  let rating = props.productInfo.rating;
  let price = props.productInfo.price;
  let discountPrice =
    parseFloat(price.replace("₹", "").replace(/,/, "")) -
    (parseFloat(price.replace("₹", "").replace(/,/, "")) *
      props.productInfo.discount) /
      100;

  // --------------------------------------------------------------------------------------------

  return (
    <>
      <Link
        ref={refProp}
        to={`/product-info/${props.productInfo.productID}`}
        className={`${Styles.mainCont}
         ${
           !hasInventory(props.productInfo.inventory)
             ? Styles.out_of_stock_product
             : ""
         }`}
      >
        {!hasInventory(props.productInfo.inventory) ? (
          <img
            className="out-of-stock-icon"
            src={soldOutIcon}
            alt={"product"}
          ></img>
        ) : (
          <></>
        )}
        <div className={Styles.imgCont}>
          <img
            src={props.productInfo.img}
            className={`${Styles.img} ${
              !hasInventory(props.productInfo.inventory)
                ? Styles.out_of_stock_image
                : ""
            }`}
            alt="img"
          />
          <span className={Styles.discountSpan}>
            - {props.productInfo.discount}% OFF
          </span>
          <div className={Styles.likeCont}>
            <Like
              productID={props.productInfo.productID}
              skuId={props.productInfo.skuId}
            />
          </div>
        </div>
        <div className={Styles.textCont}>
          <p className={Styles.brandName}>{props.productInfo.brandName}</p>
          <p className={Styles.productDesc}>{props.productInfo.desc}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 0.5rem 0 0",
            }}
          >
            <div className={Styles.RatingHolder}>
              {renderStars(rating, props.productInfo.productID)}
              <span
                className={Styles.ratingCont}
                style={{ textDecoration: "none", color: "black" }}
              >
                ({props.productInfo.count === 0 ? "1" : props.productInfo.count}
                )
              </span>
            </div>
            <div className={Styles.pricingHolder}>
              <p className={Styles.discountPrice}>₹{discountPrice}</p>
              {/* <p className={Styles.price}>{price}</p> */}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
});
export default ProductCard;
