import { Link } from "react-router-dom";
import Styles from "./index.module.css";
import { forwardRef } from "react";

const ComboCards = forwardRef(function ComboCards(props, refProp) {
  const { item } = props;
  const imageUrl = item.image.secureUrl;
  return (
    <Link
      ref={refProp}
      to={`/combo-info/${item._id}`}
      className={Styles.mainCont}
    >
      {/* {console.log("halkla", props.item)} */}
      <div
        className={Styles.imgDiv}
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        <p className={Styles.descP}>
          {item.name} <br />
          <span> @ ₹ {item.comboPrice} </span>
        </p>
        <span className={Styles.discount}>{item.discount}% Off</span>
      </div>
    </Link>
  );
});
export default ComboCards;
