import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Styles from "./index.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import { getAllProducts } from "../../../config/configService";
import ProductCard from "../card";
import { formatCurrency } from "../../../utlils/variables-and-small functions";
import Image from "../../../assets/dummyUser.png";
// //////////////////////////

const ProductShowCase = () => {
  const [data, setdata] = useState([]);
  const [error, setError] = useState(false);
  const [pageError, setPageError] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
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

  const SData = async () => {
    try {
      setPageLoading(true);
      let params = {
        page: 1,
        all: false,
      };
      const res = await getAllProducts(params);
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
    <React.Fragment>
      <div className={Styles.productShowcaseCont}>
        {pageLoading ? (
          <>
            <h1>Loading...</h1>
          </>
        ) : (
          <>
            {pageError ? (
              <>
                <h1>{pageError}</h1>
              </>
            ) : (
              <></>
            )}
            <div className={`${Styles.productShowcaseHeadCont}`}>
              <h5>What we provide</h5>
              <p>
                Products. <span>You will never regret trying</span>
              </p>
            </div>
            <div className={`${Styles.cardsCont}`}>
              {console.log("myData", data)}
              {data.length ? (
                data.map((item, index) => (
                  <ProductCard
                    key={index}
                    productInfo={{
                      brandName: item.brandName,
                      img: item.previewImage?.secureUrl || Image,
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
                <></>
              )}
            </div>
            <Link
              to={"/all-Products"}
              style={{
                textAlign: "center",
              }}
            >
              <button className={Styles.btnCss}>
                View All {"  "}
                <AiOutlineArrowRight className={Styles.ArrowRight} />
              </button>
            </Link>
          </>
        )}
      </div>
    </React.Fragment>
    // <></>
  );
};

export default ProductShowCase;
