import FeaturedBrandsCards from "./cards";
import Styles from "./index.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import Img1 from "../../../assets/featuredBrands/1.jpg";
import Img2 from "../../../assets/featuredBrands/2.jpg";
import Img3 from "../../../assets/featuredBrands/3.jpg";
import Img4 from "../../../assets/featuredBrands/4.png";
import Img5 from "../../../assets/featuredBrands/5.jpg";
import Img6 from "../../../assets/featuredBrands/6.jpg";
import Img7 from "../../../assets/featuredBrands/7.png";
import Img8 from "../../../assets/featuredBrands/8.png";
import { useEffect, useState } from "react";
import { getAllCombos } from "../../../config/configService";
import ComboCards from "./cards";
const Combo = () => {
  const [data, setdata] = useState([]);
  const [error, setError] = useState(false);
  const [pageError, setPageError] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const SData = async () => {
    try {
      setPageLoading(true);
      let params = {
        page: 1,
        all: false,
      };
      const res = await getAllCombos();
      // console.log("product showcase all-product data : ", res);
      if (res.issue) {
        setError("Products will be available soon!!");
      } else {
        if (res.result && res.result.length) {
          setdata(res.result.slice(0, 12));
        } else {
          setdata([]);
        }
      }
    } catch (error) {
      setPageError("Products will be available soon");
      // console.log("error in homepage while getting data: ", error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    SData();
  }, []);
  return (
    <div className={Styles.mainCont}>
      <div className={Styles.HeadingCont}>
        <h1>
          Exciting <span style={{ color: "#0005367d" }}>Combos.</span>
        </h1>
        <p>
          Check All Combos <AiOutlineArrowRight className={Styles.ArrowRight} />
        </p>
      </div>
      <div className={Styles.cardsCont}>
        {/* {console.log({ data })} */}
        {!!data.length &&
          data.map((item, index) => {
            return <ComboCards key={item._id || index} item={item} />;
          })}
      </div>

      {/* del later */}
      <div className={Styles.cardsCont}>
        {/* {console.log({ data })} */}
        {!!data.length &&
          data.map((item, index) => {
            return <ComboCards key={item._id || index} item={item} />;
          })}
      </div>
      <div className={Styles.cardsCont}>
        {/* {console.log({ data })} */}
        {!!data.length &&
          data.map((item, index) => {
            return <ComboCards key={item._id || index} item={item} />;
          })}
      </div>
      <div className={Styles.cardsCont}>
        {/* {console.log({ data })} */}
        {!!data.length &&
          data.map((item, index) => {
            return <ComboCards key={item._id || index} item={item} />;
          })}
      </div>
    </div>
  );
};

export default Combo;
