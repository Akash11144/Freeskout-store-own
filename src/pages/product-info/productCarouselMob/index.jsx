import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Like from "../../../components/like";
import "./index.css";
const ProductCarouselMob = (props) => {
  const { item } = props;
  // console.log(props.data);

  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: "0", left: "90%", zIndex: "1" }}>
        <Like productID={props.data.productID} skuId={props.data.skuId} />
      </div>
      <Carousel
        showStatus={false}
        showArrows={false}
        showThumbs={true}
        infiniteLoop={true}
        emulateTouch={true}
        swipeable={true}
      >
        {item.map((el) => (
          <img
            key={el._id}
            style={{ width: "100%", height: "100%" }}
            src={el.secureUrl}
            alt="thumb"
          />
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarouselMob;
