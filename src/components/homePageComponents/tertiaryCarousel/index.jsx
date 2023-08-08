import Styles from "./index.module.css";
const TertiaryCarousel = (props) => {
  const ImageRender = (imgArr) => {
    let final = [];
    for (let i = 0; i < imgArr.length; i++) {
      final.push(
        <img className={Styles.carouselImg} src={imgArr[i]} alt=""></img>
      );
    }
    return final;
  };
  return (
    <div className={Styles.mainCont}>
      <div className={Styles.Heading}>
        <h2>
          {props.myProp.Heading1}{" "}
          <span className={Styles.lightHeading}> {props.myProp.Heading2}.</span>
        </h2>
      </div>
      <div className={Styles.Carousel}>{ImageRender(props.myArray)}</div>
    </div>
  );
};

export default TertiaryCarousel;
