import Styles from "./index.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import ProductCard from "../card";
import { formatCurrency } from "../../../utlils/variables-and-small functions";
import { getAllProducts } from "../../../config/configService";
import { useEffect, useState } from "react";

////////////////////////////////////////////////////////////

const RecomendedSection = (props) => {
  const [catData, setCatData] = useState([]);
  const [conmponentLoading, setConmponentLoading] = useState(false);
  const [error, setError] = useState("");
  const category = props.myProp.type;

  useEffect(() => {
    fetchProducts();
  }, []);

  // ----------------------------------------------------------

  const fetchProducts = async () => {
    try {
      setConmponentLoading(true);
      let params = {
        page: 1,
        all: false,
        category: category,
      };
      console.log("category", category);
      const res = await getAllProducts(params);
      console.log("res", category, "=>", res);
      if (res.issue) {
        setError("Product Will be available soon for " + category);
        // setError("Fetchi");
      } else {
        if (res.result && res.result.length) {
          setCatData(res.result);
        } else {
          setCatData([]);
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getPrice = (data) => {
    let v = data
      ? data.hasVariant
        ? Object.values(data.variantPrices).length
          ? Object.values(data.variantPrices)[0]
          : "not available"
        : data.price
      : "not available";
    return v;
  };

  let bg = "red";

  // ----------------------------------------------------------

  return (
    <div
      className={Styles.mainCont}
      style={{
        background: props.myProp.colorOne,
      }}
    >
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
      <div className={`${Styles.cardsCont}`}>
        {catData.length ? (
          catData.map((item, index) => (
            <ProductCard
              key={index}
              productInfo={{
                brandName: item.brandName,
                img: item.previewImage.secureUrl,
                desc: item.productName,
                rating: item.rating.averageRating,
                count: item.rating.totalReviews,
                price: formatCurrency(getPrice(item)),
                discount: item.discount,
                productID: item ? item._id : "",
                skuId: item
                  ? item.skus.length
                    ? item.skus[0]
                    : item.skus
                  : "",
                inventory: item.inventory,
              }}
            />
          ))
        ) : (
          // <h3>Product Will be available soon for {category}</h3>
          <div class="spinner-border text-info" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecomendedSection;
