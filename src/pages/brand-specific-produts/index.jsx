import React from "react";
import Styles from "./index.module.css";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { AiOutlineArrowRight } from "react-icons/ai";
import { getBrandProducts } from "../../config/configService";
import { setVisitCount } from "../../utlils/functions";
import banner from "../../assets/CarouselIMg/1.jpg";
import ProductCard from "../../components/homePageComponents/card";
import { formatCurrency } from "../../utlils/variables-and-small functions";
import InfiniteScroll from "../../components/commonComponents/infinteScrollableProducts";
import { productUrl } from "../../services/APIService";

// //////////////////////////

const ProductShowCase = () => {
  const { brandId } = useParams();
  const [data, setdata] = useState([]);
  const [finalData, setFinalData] = useState([]);
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
  const loc = useLocation();
  const search = useLocation().search;
  const slug = new URLSearchParams(search).get("slug");

  let i = 0;
  useEffect(() => {
    if (!i) {
      let dt = new Date();
      let time = dt.getTime();
      let data = null;
      if (slug) {
        data = { slug, time, brandId };
      } else {
        let t2 = JSON.parse(sessionStorage.getItem("sesTest"));
        if (t2 && t2.slug) {
          data = { slug: t2.slug, time, brandId };
        } else {
          data = { slug: "unknown_1-2_3-4", time, brandId };
        }
      }
      setVisitCount("/brand-page", data);
    }
    return () => {
      i = 1;
    };
  }, [loc.pathname]);

  useEffect(() => {
    SData();
  }, []);

  const SData = async () => {
    try {
      setPageLoading(true);
      const res = await getBrandProducts(brandId);
      // console.log("brand-specific all-product data : ", res);
      if (res.issue) {
        setError("Products will be available soon!!");
      } else {
        if (res.result && res.result.length) {
          setdata(res.result);
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
              <InfiniteScroll
                apis={{
                  productApi: `${productUrl}/allProducts?brandId=${brandId}&page=`,
                  countApi: `${productUrl}/allProductsPageCount?brandId=${brandId}`,
                }}
              />
            )}
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default ProductShowCase;
