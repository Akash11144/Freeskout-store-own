import Styles from "./index.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
const ProductsCategoriesSection = (props) => {
  const setImages = (arr) => {
    let final = [];
    for (let i = 0; i < arr.length; i++) {
      final.push(
        <Link to={arr[i].to} className={Styles.option}>
          <div className={Styles.optionImg}>
            <img src={arr[i].img} alt="" />
          </div>
          <h2 className={Styles.optionDesc}>{arr[i].desc}</h2>
        </Link>
      );
    }
    return final;
  };
  return (
    <div className={Styles.mainCont}>
      <div className={Styles.Heading}>
        <h2>
          {props.myProp.Heading1}
          <span className={Styles.lightHeading}> {props.myProp.Heading2}.</span>
        </h2>
        <Link to={props.myProp.seeAllTo} className={Styles.seeAll}>
          See All
          <span>
            <AiOutlineArrowRight />
          </span>
        </Link>
      </div>
      <div className={Styles.Carousel}>{setImages(props.myArray)}</div>
    </div>
  );
};

export default ProductsCategoriesSection;
